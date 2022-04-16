import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { KEYCLOAK } from 'src/common/constants/global';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this.httpService.post<AuthResponse>(
        `/realms/${KEYCLOAK.realm}/protocol/openid-connect/token`,
        `grant_type=password&client_id=${KEYCLOAK.clientId}&client_secret=${KEYCLOAK.secret}&username=${loginDto.email}&password=${loginDto.password}`,
      ),
    );

    if (response.status !== 200) {
      throw response;
    }

    return response.data;
  }
}
