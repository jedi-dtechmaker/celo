import { Controller, Get } from '@nestjs/common';
import { CELO_ATTRIBUTION_TAG } from '@vorra/shared';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return {
      ok: true,
      service: 'vorra-api',
      attributionTag: CELO_ATTRIBUTION_TAG,
    };
  }
}
