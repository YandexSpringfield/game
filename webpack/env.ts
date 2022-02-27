import path from 'path';

const IS_DEV = process.env.NODE_ENV !== 'production';
const SRC_DIR = path.join(__dirname, '../src');
const BUILD_DIR = path.join(__dirname, '../dist');

export { IS_DEV, SRC_DIR, BUILD_DIR };
