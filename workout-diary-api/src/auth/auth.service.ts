import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { uuid } from 'uuidv4';

import { UserService } from '../user/user.service';
import { config } from '../config/config';
import { Auth } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authModel: Repository<Auth>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await this.passwordsAreEqual(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, id: string) {
    const deviceId = user.deviceId;
    return await this.generateTokensAndSaveSession(id, deviceId);
  }

  async refreshToken(refresh: { refreshToken: string; deviceId: string; userId: string }) {
    const { refreshTokenSecretKey } = config.getJWTConfig();
    const { refreshToken, deviceId } = refresh;
    // @ts-ignore
    const { id: sessionId, sub: userId} = jwt.decode(refreshToken);
    try {
      jwt.verify(refreshToken, refreshTokenSecretKey);
    } catch (e) {
      await this.removeSession(userId, sessionId);
      return {
        error: 'invalid token or expire',
      };
    }

    const session: Auth | null = await this.authModel.findOne({
      where: { sessionId: Equal(sessionId) },
    });

    if (!session) {
      return {
        error: 'token invalid',
      };
    }

    if (session.deviceId !== deviceId) {
      await this.authModel.remove(session);
      return {
        error: 'token invalid 2',
      };
    }
    await this.authModel.remove(session);
    return await this.generateTokensAndSaveSession(userId, deviceId);
  }

  async logout(refreshToken: string) {
    // @ts-ignore
    const { id: sessionId, sub: userId} = jwt.decode(refreshToken);
    const session = await this.authModel.findOne({
      where: { userId: Equal(userId), sessionId: Equal(sessionId) },
    });
    return session ? await this.authModel.remove(session) : false;
  }

  async logoutAll({ userId }) {
    const sessions: Auth[] | null = await this.authModel.find({
      where: { userId: Equal(userId) },
    });
    return sessions && sessions.length ? await this.authModel.remove(sessions) : false;
  }

  async getAllSession(userId: string) {
    return await this.authModel.find({
      where: { userId: Equal(userId) },
    });
  }

  private async passwordsAreEqual(
    hashedPassword: string,
    plainPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  private async generateTokensAndSaveSession(userId: string, deviceId: string) {
    await this.removeExpSessionsAndSession(userId, deviceId);
    const sessionId = uuid();
    const payload = { sub: userId };
    const { access_token, refresh_token } = this.generateTokens(payload, sessionId);
    // @ts-ignore
    const { exp } = jwt.decode(refresh_token);
    await this.saveSession({
      userId,
      sessionId,
      deviceId,
      expiresIn: exp,
    });
    return {
      access_token,
      refresh_token,
    };
  }

  private generateTokens(payload: { sub: string }, sessionId: string) {
    const { refreshTokenSecretKey, refreshTokenExpiresIn} = config.getJWTConfig();
    const refreshTokenPayload = {
      ...payload,
      id: sessionId,
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: jwt.sign(refreshTokenPayload, refreshTokenSecretKey, { expiresIn: refreshTokenExpiresIn}),
    };
  }

  private async saveSession(
   auth: Auth,
  ): Promise<string> {
    const {userId, deviceId, sessionId, expiresIn} = auth;
    await this.authModel.save({
      userId,
      deviceId,
      sessionId,
      expiresIn,
    });
    return sessionId;
  }

  private async removeExpSessionsAndSession(userId: string, deviceId: string) {
    const sessions: Auth[] | null = await this.authModel.find({
      where: { userId: Equal(userId) },
    });
    const currentTime = new Date().getTime();
    const authSessions =  sessions && sessions.length ? sessions.filter(item => item.deviceId === deviceId) : [];
    const expiredSessions = sessions && sessions.length ? sessions.filter(item => item.expiresIn < currentTime) : [];
    const removeItems = [...expiredSessions, ...authSessions];
    return removeItems && removeItems.length ? await this.authModel.remove([...expiredSessions, ...authSessions]) : false;
  }

  private async removeSession(userId: string, sessionId: string) {
    const session: Auth | null = await this.authModel.findOne({
      where: { userId: Equal(userId), sessionId: Equal(sessionId) },
    });
    return session ? await this.authModel.remove(session) : false ;
  }
}
