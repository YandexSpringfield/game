import { expressCspHeader, SELF, NONE, INLINE, DATA } from 'express-csp-header';

export const cspMiddleware = () =>
  expressCspHeader({
    directives: {
      'default-src': [SELF, 'https://ya-praktikum.tech'],
      'object-src': [NONE],
      'script-src': [SELF, INLINE],
      'font-src': [SELF, DATA],
      'media-src': [SELF],
      'style-src': [SELF, INLINE],
      'connect-src': [SELF, 'https://ya-praktikum.tech'],
      'img-src': [SELF, INLINE, DATA, 'https://ya-praktikum.tech'],
      'frame-ancestors': [SELF],
      'worker-src': [SELF],
    },
  });
