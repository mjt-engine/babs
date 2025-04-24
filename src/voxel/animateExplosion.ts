import { Curve3 } from "@babylonjs/core";
import type { Vector3 } from "@babylonjs/core";
import type { SolidParticle } from "@babylonjs/core";
import { Maths, toVec3 } from "@mjt-engine/math";
import { isDefined } from "@mjt-engine/object";
import { Randoms, type NextRandom } from "@mjt-engine/random";
import { v3 } from "../bab/v3";

export const animateExplosion = (
  particle: SolidParticle,

  options: Partial<{
    random: NextRandom;
    radius: number;
    maxBounce: number;
    groundZ: number;
    speed: number;
    decay: number;
    dispose: () => void;
  }> = {}
) => {
  const {
    random = Randoms.globalRandom,
    radius = 1,
    maxBounce = 0,
    groundZ = 0,
    speed = 20,
    decay = 0.01,
    dispose = () => (particle.isVisible = false),
  } = options;

  // const random = Noises.noiseStream(seed);
  // use path
  {
    const path = particle.props?.["path"] as Vector3[];
    if (isDefined(path) && path.length > 0) {
      const next = path.pop();
      if (!next) {
        throw new Error("No next value from path", { cause: path });
      }
      // console.log(`next: ${next.x} ${next.y} ${next.z}`);
      particle.position = next;
      return;
    }
  }

  // setup path
  {
    const { bounces = maxBounce } = particle.props ?? {};
    if (bounces <= 0) {
      if (random() < decay) {
        dispose();
      }
      return;
    }
    const bounceEnergy = bounces / maxBounce;
    const start = particle.position;
    const [x, y, z] = toVec3(start);

    const rg = (x: number) => {
      return (random() * radius * 2 - radius) * (bounceEnergy / 4) + x;
    };

    // ground position
    const [gx, gy] = [rg(x), rg(y)];

    const end = v3([gx, gy, groundZ]);

    const [mx, my, mz] = toVec3(Maths.midPoint3(start, end));
    const mid1 = v3(mx, my, z - random() * bounceEnergy * 3);
    // const mid2 = v3(x, y, mz - random() * bounceEnergy * 3);

    const catRom = Curve3.CreateCatmullRomSpline([start, mid1, end], speed);
    const path = catRom.getPoints().reverse();

    // const rotationAxis = v3([0, 1, 0]);
    // const rotationAmount = 2 * random() - 1;
    // mesh.rotate(v3(rotationAxis), rotationAmount);
    // console.log(`mb ${maxBounce}, bounces: ${bounces} ${Date.now()}`);
    const pathMetadata = {
      path,
      bounces: bounces - 1,
      // rotationAxis: [2 * random() - 1, 2 * random() - 1, 2 * random() - 1],
    };
    const metadata = particle.props ?? {};
    particle.props = { ...metadata, ...pathMetadata };
  }
};
