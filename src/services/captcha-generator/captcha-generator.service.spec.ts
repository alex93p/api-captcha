import { Test, TestingModule } from '@nestjs/testing';
import { CaptchaGeneratorService } from './captcha-generator.service';
import { ConfigObject } from 'svg-captcha';

describe('CaptchaGeneratorService', () => {
  let service: CaptchaGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaptchaGeneratorService],
    }).compile();

    service = module.get<CaptchaGeneratorService>(CaptchaGeneratorService);
  });

  it('should return an object with only 2 keys', () => {
    const config: ConfigObject = {};
    const res = service.create(config);
    expect(Object.keys(res).length).toBe(2);
  });

  it('should return an object with "data" and "text" keys', () => {
    const config: ConfigObject = {};
    const res = service.create(config);
    expect(res).toHaveProperty('data');
    expect(res).toHaveProperty('text');
  });

  it('should return an object with "data" and "text" keys both with string type', () => {
    const config: ConfigObject = {};
    const res = service.create(config);
    expect(typeof res.data === 'string').toBeTruthy();
    expect(typeof res.text === 'string').toBeTruthy();
  });

  it('should create svg image and text with custom size settings and return a text with same size', () => {
    const config: ConfigObject = {
      size: 8,
    };
    const res = service.create(config);
    expect(res.text.length).toBe(8);
  });

  it('should create svg image and text with custom size settings and return a alphanumeric text', () => {
    const config: ConfigObject = {
      size: 8,
    };
    const res = service.create(config);
    expect(res.text.length).toBe(8);
    expect(res.text).toMatch(/^[a-z0-9]+$/i);
  });

  it('should create a valid svg image', () => {
    const config: ConfigObject = {};
    const res = service.create(config);
    expect(res.data.startsWith('<svg')).toBeTruthy();
    expect(res.data.endsWith('/></svg>')).toBeTruthy();
  });

  it('should create a valid svg image with custom settings', () => {
    const config: ConfigObject = {
      width: 400,
      height: 200,
    };
    const res = service.create(config);
    expect(res.data.indexOf(`width="${config.width}" height="${config.height}"`)).toBeGreaterThan(1);
  });

  /**
   * <svg xmlns="http://www.w3.org/2000/svg" width="150" height="50"
   * /></svg>
   */
});
