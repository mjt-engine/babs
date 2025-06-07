# Changelog


## 2025-06-07
- updated hellowVr -> helloXr ([671c57b](https://github.com/mjt-engine/babs/commit/671c57b036d1b07061a3157657044f1386d01dd9)) by Matt Taylor
- added Wxr and updated helloXrWorld to use wrapped code ([7ac709a](https://github.com/mjt-engine/babs/commit/7ac709aa3a4ab6b50a6257f875717ffbb71c5e94)) by Matt Taylor

## 2025-06-06
- run render loop by default on vr hello world ([ed41b9b](https://github.com/mjt-engine/babs/commit/ed41b9bb6fe40e72273b8fd5b96afeb48e40598b)) by Matt Taylor
- make xr compat by default ([c031410](https://github.com/mjt-engine/babs/commit/c031410e3e475f1711b470b069fe670929e915d6)) by Matt Taylor
- addec hellowVrWorld ([0c6eccb](https://github.com/mjt-engine/babs/commit/0c6eccb7574657c0617dcf18405c3eeedefc88f6)) by Matt Taylor

## 2025-05-05
- added material types ([6e6e4b9](https://github.com/mjt-engine/babs/commit/6e6e4b944aaa0a2258c3d16e73b4a4c89aee9a02)) by Matt Taylor

## 2025-05-04
- clear particles on add of new mesh ([a03b033](https://github.com/mjt-engine/babs/commit/a03b033b2f52d28ec2c4bfe276f1642e1ccd37c5)) by Matt Taylor
- make dead particles transparent ([d7a8f12](https://github.com/mjt-engine/babs/commit/d7a8f12e6e735fa269f067e76a2fcca611228708)) by Matt Taylor
- fix undefined mesh NPE ([03a0790](https://github.com/mjt-engine/babs/commit/03a0790b4d9bcf43c63506202bd2361f085c67f8)) by Matt Taylor
- dispose of mesh on SPS with recursive ([ffa5a19](https://github.com/mjt-engine/babs/commit/ffa5a19cf815e09e8354311ec9c6f519624de8cd)) by Matt Taylor
- displose of SPS on renew instead of just the mesh ([9bb35fd](https://github.com/mjt-engine/babs/commit/9bb35fd6990421a455b755b0d7bef7fe4318a2db)) by Matt Taylor
- bump BJS to 8.6.1 ([09b3505](https://github.com/mjt-engine/babs/commit/09b3505e54aaeefb8f840bd68012249bcf0e8d4f)) by Matt Taylor
- mark particles dead by default, alive when updated ([9cdaa48](https://github.com/mjt-engine/babs/commit/9cdaa48dde63b5361fac6f982afd6a3ec3101d6c)) by Matt Taylor

## 2025-05-02
- updateNextParticle assumes name ([bf1b4ab](https://github.com/mjt-engine/babs/commit/bf1b4ab49e39d829d7d9dfa041b651649f1c4b73)) by Matt Taylor
- fixed emmissive color not updating on material create bug ([d92258f](https://github.com/mjt-engine/babs/commit/d92258fddf283cf76ccc6e5fed8c53a2f7dd9190)) by Matt Taylor
- added SPS next-particle ([1059794](https://github.com/mjt-engine/babs/commit/105979421a48288b86c1762c3d411f220b37581c)) by Matt Taylor

## 2025-05-01
- cleanup vite.config.ts ([f2e983e](https://github.com/mjt-engine/babs/commit/f2e983eead47371a146cbd594279d73ad2177d6d)) by Matt Taylor
- bump deps ([b659c10](https://github.com/mjt-engine/babs/commit/b659c1044334247b0d39832265564b85a9be8307)) by Matt Taylor

## 2025-04-30
- fixed to plane and top-down camera, fix the left/right backwards on ortho ([bc14759](https://github.com/mjt-engine/babs/commit/bc147593de667d7a942479e86615a933bd5eaea7)) by Matt Taylor
- hack planes so that they are double-sided by default to fix broken wrong facing side that likely will not be fixed inside of BJS ([281e13b](https://github.com/mjt-engine/babs/commit/281e13b44ec1557bf613e6b551e7317ce8c7f1f7)) by Matt Taylor
- cleanup SPS, add BabCamera type ([c652461](https://github.com/mjt-engine/babs/commit/c6524614353a13293c5d2c5bdf09bed270e5aea4)) by Matt Taylor

## 2025-04-29
- added Sps Debug, sprite manager ([aa6a2ad](https://github.com/mjt-engine/babs/commit/aa6a2adedb5dbfb2a7b8947992a1d1f194bfe119)) by Matt Taylor

## 2025-04-26
- createTextureAtlas and better Sprites ([eebf3b5](https://github.com/mjt-engine/babs/commit/eebf3b57cbd46a8f61e8fb482c5478365a89af3b)) by Matt Taylor
- cleanup of particle system, prior to major redo of interfaces ([3ecf4a5](https://github.com/mjt-engine/babs/commit/3ecf4a59dba3433be1006525294dcaf155f8f077)) by Matt Taylor
- properly init webgpu engine ([5581805](https://github.com/mjt-engine/babs/commit/5581805a4f5261f9308ac58c22916be51ea57813)) by Matt Taylor
- engine->webglengine and add checking of webgpu support ([4090efc](https://github.com/mjt-engine/babs/commit/4090efcc2ab66b96316271096a04c59ce0261baf)) by Matt Taylor
- pnpm messes with package.json and removed empty peers...grrr.... ([eab08af](https://github.com/mjt-engine/babs/commit/eab08afdf0c11da8abc309a1479894712adb9414)) by Matt Taylor
- direct deps for babylonjs and d3 array ([8b381a9](https://github.com/mjt-engine/babs/commit/8b381a98f4d97dba31c033f8e402c4cce782d1a4)) by Matt Taylor
- add webgpu engine ([1276b98](https://github.com/mjt-engine/babs/commit/1276b98fb3aa80451eec46d4efba98446c8c6d4f)) by Matt Taylor
- bumped BJS to 8.4.0 ([a284e08](https://github.com/mjt-engine/babs/commit/a284e08df276e5754a7e99d66ad6d6412c4b08a2)) by Matt Taylor

## 2025-04-24
- set the name on the texture for url texture ([3fd101d](https://github.com/mjt-engine/babs/commit/3fd101d43e550d502d42b0f89a3537edef89f17f)) by Matt Taylor
- added rest of cameras back after treeshake import cleanup ([b7c0872](https://github.com/mjt-engine/babs/commit/b7c0872c68bf74f795761b48f698e11b1776c007)) by Matt Taylor
- allow canvas to be based in directly to createEngine for better DX ([db237ad](https://github.com/mjt-engine/babs/commit/db237ad07ca5d09f10be31b576f98ee38959f77f)) by Matt Taylor
- re-enable the helloWorld ([7e489a2](https://github.com/mjt-engine/babs/commit/7e489a207a8eabb4f156c7b05b2a49f87a082cb4)) by Matt Taylor
- re-enable typedefs ([a5192c9](https://github.com/mjt-engine/babs/commit/a5192c985136cc7b763daa713d83bee95e292f9b)) by Matt Taylor
- better imports for tree shaking, using vite as builder ([e0299c9](https://github.com/mjt-engine/babs/commit/e0299c95a17a8b1d794868f0a61bd8ccb3c7cea1)) by Matt Taylor
- bump deps ([b7b7d4d](https://github.com/mjt-engine/babs/commit/b7b7d4d7774a64f58107e1b3ae9dee0ab23f417e)) by Matt Taylor

## 2025-03-28
- fix package name ([3ca08b3](https://github.com/mjt-engine/babs/commit/3ca08b3f236a045f628e6878bf6a1d97313a3593)) by Matt Taylor
- initial-commit ([2d8eb81](https://github.com/mjt-engine/babs/commit/2d8eb81700e7a78154e14fcd1a60ebf786092a4d)) by Matt Taylor
