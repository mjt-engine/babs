import { Inputs as U } from "@mjt-engine/input";
import { toVec3 as N, Maths as $, toVec2 as ft } from "@mjt-engine/math";
import * as b from "@babylonjs/core";
import { Vector3 as Y, Engine as Zt, Color3 as pt, Color4 as Q, Matrix as mt, Scene as k, UniversalCamera as q, Camera as _, TargetCamera as Yt, ArcRotateCamera as j, HemisphericLight as yt, PointLight as wt, StandardMaterial as H, PBRMaterial as Xt, Mesh as L, MeshBuilder as v, SolidParticleSystem as tt, InstancedMesh as Kt, Texture as I, WebGPUEngine as xt, SceneLoader as lt, DynamicTexture as et, HtmlElementTexture as Jt, GlowLayer as Mt, HighlightLayer as Qt, TransformNode as qt, Ray as jt, Constants as te, SpritePackedManager as ee, SpriteManager as re, Sprite as ne, Curve3 as oe } from "@babylonjs/core";
import { Colors as E } from "@mjt-engine/color";
import { isUndefined as B, isDefined as y, iff as w, tuple2 as ae, tuple3 as se, Arrays as ie } from "@mjt-engine/object";
import { extent as ut } from "d3-array";
import { Asserts as D, assertValue as ce } from "@mjt-engine/assert";
import { Randoms as bt } from "@mjt-engine/random";
import { Images as le } from "@mjt-engine/image";
import "@babylonjs/inspector";
import { Noises as ue } from "@mjt-engine/noise";
function m(t = 0, r = 0, e = 0) {
  if (typeof t == "number")
    return new Y(t, r, e);
  const [n = 0, o = 0, a = 0] = N(t);
  return new Y(n, o, a);
}
const Tt = (t, r) => {
  const e = t.alpha, n = t.beta, o = t.radius;
  t.target = t.target.add(m(r)), t.radius = o, t.alpha = e, t.beta = n;
}, Ct = (t, r = {}) => {
  const {
    keySensitivity: e = 0.5,
    mouseSensitivity: n = 0.05,
    parent: o = document.body,
    action: a = () => {
    }
  } = r, s = t.alpha, i = t.beta, l = t.radius;
  m(t.target);
  const c = (d = 0, f = 0, g = 0) => {
    Tt(t, [d, f, g]), a();
  }, h = U.listenToKey(
    {
      // Y up
      w: () => {
        c(-e / 2, e / 2, 0);
      },
      "shift+w": () => {
        t.radius -= e;
      },
      // X left
      a: () => {
        c(-e / 2, -e / 2, 0);
      },
      "shift+s": () => {
        t.radius += e;
      },
      // Y down
      s: () => {
        c(e / 2, -e / 2, 0);
      },
      // X right
      d: () => {
        c(e / 2, e / 2, 0);
      },
      v: () => {
        t.beta = t.beta + e / 8, a();
      },
      z: () => {
        t.beta = t.beta - e / 8, a();
      },
      c: () => {
        t.alpha = s, t.beta = i, t.radius = l, a();
      },
      "shift+d": () => {
        t.alpha = t.alpha + e / 8, a();
      },
      "shift+a": () => {
        t.alpha = t.alpha - e / 8, a();
      }
    },
    {
      autoUp: !1,
      parent: o
    }
  ), p = {
    lastPosition: void 0
  };
  o.addEventListener("pointerdown", (d) => {
    d.buttons === 4 && (p.lastPosition = d);
  }), o.addEventListener("pointermove", (d) => {
    if (d.buttons !== 4)
      return;
    const { lastPosition: f = d } = p;
    p.lastPosition = d;
    const g = $.subtract2(f, d), [x, M] = ft(g);
    if (d.buttons === 4 && d.shiftKey) {
      t.beta = t.beta + M * n;
      return;
    }
    d.buttons === 4 && (c(M * n, -M * n, 0), c(x * n, x * n, 0));
  });
  const u = U.listenToMouse(
    {
      wheel: (d) => {
        if (d instanceof WheelEvent) {
          const f = d.deltaY * n;
          t.radius += f, a();
        }
      }
    },
    {
      parent: o
    }
  );
  return [h, u];
}, St = ({
  width: t = 320,
  height: r = 320
}) => {
  const e = document.createElement("canvas");
  return e.width = t, e.height = r, e;
}, G = (t) => {
  const r = t instanceof HTMLCanvasElement || t instanceof OffscreenCanvas ? {} : t ?? {}, e = t instanceof HTMLCanvasElement || t instanceof OffscreenCanvas ? t : St({
    width: t?.width ?? 320,
    height: t?.height ?? 320
  }), { antialias: n } = r, o = new Zt(e, n, {
    powerPreference: "high-performance",
    ...r
  });
  return o.hideLoadingUI(), o;
}, S = (t) => {
  const r = E.builder({ color: t }).hex();
  return pt.FromHexString(r);
}, F = (t) => {
  const r = E.builder({ color: t }), e = Q.FromHexString(r.hex());
  return e.a = r.alpha(), e;
}, dt = (t, r, e, n = {}) => {
  const { camera: o = t.activeCamera, predicate: a = () => !0 } = n, s = t.createPickingRay(r, e, mt.Identity(), o);
  return t.pickWithRay(s, a)?.pickedMesh;
}, X = (t, r) => {
  if (t instanceof k)
    return t.meshes.forEach((e) => X(e, r));
  r(t), t.getChildMeshes().forEach((e) => X(e, r));
}, de = (t, r = {}) => {
  const {
    keySensitivity: e = 0.05,
    mouseSensitivity: n = 0.05,
    parent: o = document.body
  } = r;
  U.listenToKey(
    {
      w: () => {
        t.position.addInPlace(m(0, 0, -e));
      },
      a: () => {
        t.rotation.y -= e / 2;
      },
      s: () => {
        t.position.addInPlace(m(0, 0, e));
      },
      d: () => {
        t.rotation.y += e / 2;
      },
      i: () => {
        t.position.addInPlace(m(0, e, 0));
      },
      j: () => {
        t.position.addInPlace(m(e, 0, 0));
      },
      k: () => {
        t.position.addInPlace(m(0, -e, 0));
      },
      l: () => {
        t.position.addInPlace(m(-e, 0, 0));
      }
    },
    {
      propagate: !1,
      parent: o
    }
  ), U.listenToMouse(
    {
      wheel: (a) => {
        if (a instanceof WheelEvent) {
          if (a.shiftKey) {
            const i = a.deltaX * n;
            t.position.addInPlace(m(0, -i, 0));
            return;
          }
          const s = a.deltaY * n;
          t.position.addInPlace(m(0, 0, s));
        }
      },
      click: (a) => {
        if (a.buttons === 0) {
          const s = a, i = t.getScene(), l = dt(i, s.layerX, s.layerY);
          y(l) && (console.log({ mesh: l }), X(i, (c) => {
            B(c.material) || c.material && (c.material.wireframe = !1);
          }), l.material && (l.material.wireframe = !0));
        }
      },
      auxclick: (a) => {
        if (a.button !== 1)
          return;
        const s = t.getScene(), i = dt(s, a.clientX, a.clientY);
        B(i);
      },
      contextmenu: (a) => {
        console.log("should context");
      }
    },
    {
      propagate: !1,
      parent: o
    }
  );
}, he = (t, r, {
  unitsTall: e = 1,
  unitsWide: n = 1,
  height: o = 100,
  disposeActive: a = !1
} = {}) => {
  a && t?.activeCamera?.dispose();
  const s = new q(r, m(0, 0, o), t);
  return s.target = m(0, 0, 0), s.rotation = m(0, Math.PI, Math.PI), s.orthoTop = -e / 2, s.orthoBottom = e / 2, s.orthoLeft = -n / 2, s.orthoRight = n / 2, s.mode = _.ORTHOGRAPHIC_CAMERA, s;
}, rt = (t, r, e) => {
  const n = t.getCameraByName(r);
  return y(n) ? n : e();
}, nt = (t, r) => {
  const {
    alpha: e,
    beta: n,
    radius: o,
    target: a,
    position: s,
    rotation: i,
    minZ: l,
    maxZ: c,
    mode: h,
    orthoTop: p,
    orthoBottom: u,
    orthoLeft: d,
    orthoRight: f
  } = r;
  w(s, (g) => {
    t.position = m(g);
  }), w(l, (g) => {
    t.minZ = g;
  }), w(c, (g) => {
    t.maxZ = g;
  }), w(h, (g) => {
    t.mode = ht[g];
  }), w(h, (g) => {
    t.mode = ht[g];
  }), w(p, (g) => {
    t.orthoTop = g;
  }), w(u, (g) => {
    t.orthoBottom = g;
  }), w(d, (g) => {
    t.orthoLeft = g;
  }), w(f, (g) => {
    t.orthoRight = g;
  }), t instanceof Yt && (w(i, (g) => {
    t.rotation = m(g);
  }), w(a, (g) => {
    t.target = m(g);
  })), t instanceof j && (w(e, (g) => {
    t.alpha = g;
  }), w(n, (g) => {
    t.beta = g;
  }), w(o, (g) => {
    t.radius = g;
  }));
}, ge = (t, r, e = {}) => {
  const n = rt(t, r, () => {
    const { alpha: o = 0, beta: a = 0, radius: s = 2, target: i } = e;
    return new j(r, o, a, s, m(i), t);
  });
  return nt(n, e), n;
}, fe = (t, r, e = {}) => {
  const n = rt(t, r, () => {
    const { position: o } = e;
    return new q(r, m(o), t);
  });
  return nt(n, e), n;
}, pe = (t, r) => {
  t?.activeCamera?.dispose();
  const e = t.getEngine().getRenderingCanvas(), n = -Math.PI / 2, o = Math.PI / 2.5, a = new j(r, n, o, 15, m(0, 0, 0), t);
  a.attachControl(e, !0), a.mode = _.PERSPECTIVE_CAMERA;
}, ht = {
  orthographic: _.ORTHOGRAPHIC_CAMERA,
  perspective: _.PERSPECTIVE_CAMERA
}, Et = {
  getArcRotateCamera: ge,
  getCamera: rt,
  updateCamera: nt,
  getUniversalCamera: fe,
  attachArcRotateCameraControls: Ct,
  attachUniversalCameraControls: de,
  createTopDownCamera: he,
  createDebugCamera: pe
}, ot = (t, r, e) => {
  const n = t.getLightByName(r);
  return y(n) ? n : e();
}, at = (t, r) => {
  const { intensity: e, direction: n, position: o } = r;
  w(e, (a) => {
    t.intensity = a;
  }), t instanceof yt && w(n, (a) => {
    t.direction = m(a);
  }), t instanceof wt && w(o, (a) => {
    t.position = m(a);
  });
}, me = (t, r, e = {}) => {
  const n = ot(t, r, () => {
    const { direction: o } = e;
    return new yt(r, m(o), t);
  });
  return at(n, e), n;
}, ye = (t, r, e = {}) => {
  const n = ot(t, r, () => {
    const { position: o } = e;
    return new wt(r, m(o), t);
  });
  return at(n, e), n;
}, Pt = {
  getLight: ot,
  getHemisphericLight: me,
  getPointLight: ye,
  updateLight: at
}, P = (t, r, e, n = !1) => {
  const o = t.getMeshByName(r);
  return y(o) && !n ? o : y(o) && n ? e(o) : e();
}, we = (t, r, e) => {
  const {
    alpha: n,
    diffuseTexture: o,
    emissiveTexture: a,
    ambientTexture: s,
    opacityTexture: i,
    diffuseColor: l,
    specularColor: c,
    ambientColor: h,
    emissiveColor: p
  } = e;
  w(o, (u) => {
    const d = t.getTextureByName(u);
    r.diffuseTexture = d;
  }), w(a, (u) => {
    const d = t.getTextureByName(u);
    r.emissiveTexture = d;
  }), w(s, (u) => {
    const d = t.getTextureByName(u);
    r.ambientTexture = d;
  }), w(i, (u) => {
    const d = t.getTextureByName(u);
    r.opacityTexture = d;
  }), w(l, (u) => {
    r.diffuseColor = S(u);
    const d = E.from(u).alpha();
    d < 1 && (r.alpha = d);
  }), w(c, (u) => {
    r.specularColor = S(u);
  }), w(h, (u) => {
    r.ambientColor = S(u);
  }), w(p, (u) => {
    r.specularColor = S(u);
  }), w(n, (u) => {
    r.alpha = u;
  });
}, gt = (t, r, e) => {
  r instanceof H && we(t, r, e);
}, O = (t, r, e = "standard") => {
  const n = t.getMaterialByName(r);
  if (y(n))
    return n;
  const o = typeof e == "string" ? e : e?.type ?? "standard";
  switch (o) {
    case "standard": {
      const a = new H(r, t);
      return gt(t, a, e), a;
    }
    case "pbr": {
      const a = new Xt(r, t);
      return gt(t, a, e), a;
    }
    default:
      throw new Error(`Unknown material type: '${o}'`);
  }
}, R = (t, r, e) => {
  const { position: n, color: o, material: a, receiveShadows: s } = e;
  r instanceof L && y(a) && (r.material = O(t, a, "standard")), r instanceof L && y(s) && (r.receiveShadows = s), w(n, (i) => {
    r.position = m(i);
  }), w(o, (i) => {
    const l = r.material;
    if (l instanceof H) {
      l.diffuseColor = S(i);
      const c = E.from(i).alpha();
      c < 1 && (l.alpha = c), l.specularColor = S("black"), l.ambientColor = S(i), l.emissiveColor = S(i);
    }
  });
}, vt = (t, r, e = {}) => P(t, r, () => {
  const { width: n = 1, height: o = 1, depth: a = 1, colors: s } = e, i = v.CreateBox(
    r,
    {
      width: n,
      height: o,
      depth: a,
      faceColors: y(s) ? s.map(F) : void 0
    },
    t
  );
  return R(t, i, e), i;
}), Rt = (t, r, e) => {
  const {
    width: n = 1,
    height: o = 1,
    depth: a = 1,
    material: s,
    receiveShadows: i = !1
  } = e, l = `box-instance-root-${JSON.stringify([
    n,
    o,
    a,
    s,
    i
  ])}`;
  let c = t.getMeshByName(l);
  if (B(c)) {
    if (c = v.CreateBox(l, { width: n, height: o, depth: a }, t), c.receiveShadows = i, c.isVisible = !1, !s)
      throw new Error("No material", { cause: e });
    c.material = O(t, s, "standard");
  }
  const h = c.createInstance(r);
  return R(t, h, e), h;
}, xe = (t, r, e) => {
  const { radius: n = 0.5 } = e;
  return P(t, r, () => {
    const o = v.CreateSphere(
      r,
      { diameter: n * 2 },
      t
    );
    return R(t, o, e), o;
  });
}, Me = (t, r, e, n = {}) => {
  const {
    predicate: o = (l) => l.isPickable,
    camera: a = t.activeCamera
  } = n, s = t.createPickingRay(r, e, mt.Identity(), a);
  return t.pickWithRay(s, o)?.pickedMesh;
}, be = (t) => {
  t.computeWorldMatrix(!0), t.refreshBoundingInfo({});
  const [r, e, n] = N(t.getAbsolutePosition()), o = t.getBoundingInfo().boundingSphere.radius;
  return [r, e, n - o];
}, K = (t, r) => {
  if (t instanceof k)
    return t.meshes.forEach((e) => K(e, r));
  r(t), t.getChildMeshes().forEach((e) => K(e, r));
}, Te = {
  tetrahedron: 0,
  octahedron: 1,
  dodecahedron: 2,
  icosahedron: 3,
  rhombicuboctahadron: 4,
  triangularPrism: 5,
  pentagonalPrism: 6,
  hexagonalPrism: 7,
  squarePyramid: 8,
  pentagonalPyramid: 9,
  triangularDipyramid: 10,
  pentagonalDipryramid: 11,
  elongatedSquareDipyramid: 12,
  elongatedPentagonalDipyramid: 13,
  elongatedPentagonalCupola: 14
}, Ce = (t, r, e = {}) => P(t, r, () => {
  const { size: n = 1, type: o = "tetrahedron" } = e, a = v.CreatePolyhedron(
    r,
    { type: Te[o], size: n },
    t
  );
  return R(t, a, e), a;
}), Se = (t) => {
  const r = t.getBoundingInfo().boundingBox.vectors, e = t.getScene(), n = e.getEngine().getRenderingCanvas();
  if (!n)
    throw new Error("No canvas for scene", { cause: e });
  const o = t.getWorldMatrix(), a = e.getTransformMatrix(), s = e.activeCamera.viewport, i = r.map((d) => {
    const f = Y.Project(d, o, a, s);
    return f.x = f.x * n.clientWidth, f.y = f.y * n.clientHeight, f;
  }), [l, c] = ut(i, (d) => d.x), [h, p] = ut(i, (d) => d.y);
  return {
    width: c - l,
    height: p - h,
    left: l,
    top: h,
    right: c,
    bottom: p
  };
}, Ee = (t, r, e = {}) => {
  const {
    recurse: n = !0,
    disposeMaterials: o = !1,
    disposeTextures: a = !1
  } = e, s = t.getMeshByName(r);
  if (s) {
    if (s.dispose(!n, !1), o) {
      const i = s.material;
      if (!i)
        return;
      i.name = `DISPOSED-${i.name}`, i?.dispose(!0, a), t.removeMaterial(i);
    }
    t.removeMesh(s);
  }
}, Pe = (t) => {
  if (!B(t))
    return t.sort((r, e) => r.distance - e.distance), t[0];
}, ve = (t, r, e = {}) => P(t, r, () => {
  const { arc: n = 1, height: o = 1, radius: a = 0.5, tag: s } = e, i = v.CreateCylinder(
    r,
    {
      height: o,
      arc: n,
      diameter: a * 2
    },
    t
  );
  return R(t, i, e), i;
}), Re = (t, r, e) => {
  const { updatable: n = !1 } = e;
  return P(
    t,
    r,
    (o) => Ae(t, r, {
      ...e,
      instance: o
      // updatable: undefined,
    }),
    n
  );
}, Ae = (t, r, e) => {
  const {
    colors: n = [],
    points: o = [],
    color: a = "white",
    updatable: s = !1,
    useVertexAlpha: i,
    instance: l
  } = e, c = o.map((u, d) => n[d] ?? a).map((u) => F(u)), h = o.map((u) => m(u)), p = v.CreateLines(r, {
    points: h,
    colors: c,
    updatable: s,
    useVertexAlpha: i,
    instance: l
  });
  return R(t, p, e), p;
}, J = (t, r, e) => {
  const n = t.getMeshByName(r);
  return y(n) ? Promise.resolve(n) : e();
}, Ie = (t, r, e, n) => P(t, r, () => {
  const o = P(t, e, n);
  return D.assertValue(o, () => (console.log({ scene: t, name: r, rootName: e, producer: n }), "Unable to create mesh instance. Missing root mesh.")), o.createInstance(r);
}), Le = async (t, r, e, n) => J(t, r, async () => {
  const o = await J(t, e, n);
  return D.assertValue(o, () => (console.log({ scene: t, name: r, rootName: e, producer: n }), "Unable to create mesh instance. Missing root mesh.")), o.createInstance(r);
}), Be = (t, r, e = {}) => P(t, r, () => {
  const { width: n = 1, height: o = 1, tag: a } = e, s = v.CreatePlane(
    r,
    {
      width: n,
      height: o
    },
    t
  ), { billboard: i } = e;
  return i && (s.billboardMode = L.BILLBOARDMODE_ALL), R(t, s, e), s;
}), Ne = (t, r, e = {}) => P(t, r, () => {
  const { radius: n = 0.5 } = e, o = v.CreateTorusKnot(r, { radius: n }, t);
  return R(t, o, e), o;
}), _e = (t) => {
  const { XYZI: r, SIZE: e } = t, n = e.z, o = 1 / n / 2, a = 1 / n / 2, s = 1 / n / 2;
  return r.map((i) => {
    const [l, c, h] = N(i), p = (l - e.x / 2) / n + o, u = (c - e.y / 2) / n + a, d = (h - e.z / 2) / -n - s;
    return ae(se(p, u, d), i.i);
  });
}, At = (t, r, e) => {
  const { XYZI: n, RGBA: o, SIZE: a } = r, s = o.map((p) => {
    const { r: u, g: d, b: f, a: g } = p;
    return E.builder({ color: [u, d, f, g], model: "rgba" }).toString();
  }), i = new tt(e, t), l = 1 / a.z, c = v.CreateBox("temp-box", {
    width: l,
    height: l,
    depth: l
  });
  i.addShape(c, n.length), i.buildMesh(), c.dispose(), _e(r).forEach((p, u) => {
    const [d, f] = p, g = i.particles[u];
    g.position = m(d);
    const x = s[f];
    g.color = F(x);
  });
  const h = O(t, "vox-material", "standard");
  return h.specularColor = S("black"), i.mesh.material = h, i.setParticles(), i;
}, ke = (t, r, e, n = {}) => {
  const o = t.metadata ?? {}, { voxes: a = {} } = o, s = a[e];
  if (B(s))
    throw console.log({ scene: t, name: r, src: e }), new Error(`No voxData found for ${e} ${r}`);
  const i = At(t, s, r), l = i.mesh;
  return R(t, l, n), i;
}, He = (t) => t instanceof Kt, Oe = (t, r) => {
  const [e, n] = ft($.normalize2($.subtract2(r, t)));
  return Math.atan2(n, e) + Math.PI / 2;
}, It = (t, r = {}) => {
  const {
    disposeSource: e = !1,
    allow32BitsIndices: n = !0,
    meshSubclass: o = void 0,
    subdivideWithSubMeshes: a = !1,
    multiMultiMaterials: s = !1
  } = r;
  return L.MergeMeshes(
    t,
    e,
    n,
    o,
    a,
    s
  );
}, Ue = (t, r, e, n = {}) => {
  const {
    predicate: o = (s) => s.isPickable,
    camera: a = t.activeCamera
  } = n;
  if (!a)
    throw new Error("Camera required");
  return t.multiPick(r, e, o, a);
}, Lt = (t, r = /.*/, e = 0) => {
  const n = "".padStart(e * 2);
  if (r.test(t.name)) {
    console.log(`${n}mesh: '${t.name}'`);
    const o = t.material;
    y(o) && Object.entries(o).filter(
      (s) => /.Texture$/.test(s[0])
    ).map((s) => {
      const [i, l] = s;
      l instanceof I && i !== "_environmentBRDFTexture" && console.log(`${n}tex: '${l.name}' (${i})`);
    });
  }
  t.getChildMeshes().map((o) => Lt(o, r, e + 1));
}, Bt = {
  lookAt: Oe,
  getBox: vt,
  describeMesh: Lt,
  getPlane: Be,
  getBoxInstance: Rt,
  getSphere: xe,
  getCylinder: ve,
  getTorusKnot: Ne,
  getLine: Re,
  walkMeshes: K,
  pickMesh: Me,
  getMesh: P,
  getMeshAsync: J,
  calcTopOfMeshWorldPosition: be,
  mergeMeshes: It,
  getVoxModel: ke,
  calcClientRectForMesh: Se,
  updateArcRotateCameraPosition: Tt,
  findClosestPick: Pe,
  destroyMesh: Ee,
  getMeshInstance: Ie,
  getMeshInstanceAsync: Le,
  isInstancedMesh: He,
  pickMeshes: Ue,
  getPolyhedron: Ce,
  updateMesh: R
}, $e = (t = G()) => {
  const r = new k(t), e = t.getRenderingCanvas();
  Et.getArcRotateCamera(r, "Camera", {}).attachControl(e, !0), Pt.getHemisphericLight(r, "light1", {
    direction: [1, 1, 1]
  }), Bt.getSphere(r, "sphere", {
    radius: 0.5
  });
  const o = { debug: !1 };
  return e.onkeyup = (a) => {
    a.ctrlKey && a.keyCode === 73 && (o.debug = !o.debug, o.debug ? r.debugLayer.hide() : (console.log("SHOW!"), r.debugLayer.show()));
  }, t.runRenderLoop(() => {
    r.render();
  }), r;
}, Zr = {
  createEngine: G,
  createCanvas: St,
  v3: m,
  c3: S,
  c4: F,
  helloWorld: $e,
  attachEditorControls: Ct
}, De = async ({
  canvas: t,
  ...r
}) => {
  const e = new xt(t, {
    // powerPreference: "high-performance",
    ...r
  });
  return e.hideLoadingUI(), await e.initAsync(), e;
}, Ge = () => xt.IsSupportedAsync, Yr = {
  createWebGlEngine: G,
  createWebGpuEngine: De,
  isWebGpuCapable: Ge
}, Fe = (t) => (r) => {
};
async function ze(t, r = t.name) {
  return await t();
}
const st = (t) => {
  const r = Fe();
  return new Promise((e, n) => {
    try {
      t.onAfterRenderCameraObservable.addOnce(() => {
        r(), e();
      }), t.render(!0);
    } catch (o) {
      n(o);
    }
  });
}, Ve = (t) => {
  console.log("fixing eyelashes", t.meshes), t.meshes.forEach((r) => {
    if (r.name.includes("Eyelashes") && (console.log("fixing eyelashes", r.name), r.name.includes("primitive1"))) {
      console.log("fixing eyelashes: primitive1", r.name);
      const e = r.material;
      if (!e)
        throw new Error("Mesh has no material", { cause: r });
      const n = e.getActiveTextures()[0];
      n.hasAlpha = !0, n.getAlphaFromRGB = !0, e.transparencyMode = 1, e.opacityTexture = n, r.visibility = 0.5, e.albedoColor = new pt(0, 0, 0);
    }
  });
}, We = [
  // "Irises",
  // "Pupils",
  // "Sclera", // 'red' of the eye
  // "Cornea",
  // "Eyelashes",
  // "EyeMoisture",
  // "EyeSocket",
  // "Face",
  // "Teeth",
  // "Lips",
  // "Mouth",
  // "Ears",
  // "Torso",
], Ze = [
  "Irises",
  "Pupils",
  "Sclera"
  // "Eyelashes",
  // "EyeSocket",
  // "Face",
  // "Teeth",
  // "Lips",
  // "Mouth",
  // "Ears",
  // "Torso",
], Nt = (t) => {
  const r = t?.material?.getActiveTextures() ?? [];
  if (y(
    r.find((e) => {
      const n = e?.name;
      return y(We.find((o) => n.includes(o)));
    })
  ) && (t.visibility = 0), y(
    r.find((e) => {
      const n = e?.name;
      return y(Ze.find((o) => n.includes(o)));
    })
  )) {
    const e = t.material;
    e.metallic = 1, e.transparencyMode = 2, e.albedoTexture && (e.albedoTexture.hasAlpha = !0), e.clearCoat.isEnabled = !0, e.clearCoat.intensity = 0.2, e.subSurface.isTranslucencyEnabled = !0, e.subSurface.translucencyIntensity = 0.5, e.subSurface.translucencyIntensityTexture = e.albedoTexture, e.opacityTexture = e.albedoTexture;
  }
  if (t.name === "Genesis8Female.Shape_primitive10") {
    const e = t.material;
    e.metallic = 0, t.visibility = 0;
  }
  if (t.name === "Genesis8Female.Shape_primitive12") {
    const e = t.material;
    e.roughness = 0, e.clearCoat.isEnabled = !0, e.clearCoat.intensity = 0.5, e.subSurface.isTranslucencyEnabled = !0, e.subSurface.translucencyIntensity = 0.5, e.subSurface.translucencyIntensityTexture = e.albedoTexture, t.visibility = 0, t.setEnabled(!1);
  }
  if (t.name === "Genesis8Female.Shape_primitive13") {
    const e = t.material;
    e.metallic = 0;
  }
  if (t.name === "Genesis8Female.Shape_primitive14") {
    const e = t.material;
    e.opacityTexture = null, e.metallic = 0, e.useAlphaFromAlbedoTexture = !1, e.albedoTexture && (e.albedoTexture.level = 3);
  }
  if (t.name.endsWith("Eyelashes.Shape_primitive0")) {
    const e = t.material;
    e.roughness = 0.5, e.clearCoat.isEnabled = !0, e.clearCoat.intensity = 0.5, e.subSurface.isTranslucencyEnabled = !0, e.subSurface.translucencyIntensity = 0.5, e.subSurface.translucencyIntensityTexture = e.albedoTexture, t.visibility = 0.2;
  }
  t.getChildMeshes().map(Nt);
}, Ye = (t) => {
  console.log("fixing bump maps", t.meshes), t.meshes.forEach((r) => {
    const e = r.material;
    e && (e.bumpTexture = null);
  });
}, Xe = (t) => {
  Ve(t), t.meshes.map(Nt), Ye(t);
}, Ke = (t) => {
  const { path: r, scene: e, name: n = r instanceof File ? r.name : r } = t;
  return e.getEngine().hideLoadingUI(), new Promise((a, s) => {
    try {
      lt.ShowLoadingScreen = !1, lt.Append(
        "",
        r,
        e,
        (i) => {
          const l = i.getMeshByName("__root__");
          if (!l)
            throw new Error("No root mesh found", { cause: i });
          l.name = n, i.cameras.length > 0 && (i.activeCamera = i.cameras[0]), i.animationGroups.forEach((c) => {
            c.stop();
          }), Xe(i), a(l);
        },
        (i) => {
        },
        (i, l, c) => {
          console.log({ path: r, scene: i, message: l, reason: c }), s(c);
        }
      );
    } catch (i) {
      s(i);
    }
  });
}, Xr = {
  renderOnce: st,
  loadDazFigure: Ke
  // fixDazFigure,
  // loadAssetContainer,
  // builder,
}, _t = (t, r = t.width, e = t.height) => {
  const n = document.createElement("canvas");
  return n.width = r, n.height = e, n.getContext("2d").drawImage(
    t,
    0,
    0,
    t.width,
    t.height,
    0,
    0,
    n.width,
    n.height
  ), n;
}, Je = async (t) => {
  if (typeof t == "string")
    return t;
  const r = document.createElement("canvas");
  return r.width = t.width, r.height = t.height, r.getContext("2d").drawImage(t, 0, 0), await le.toSrcString(r);
}, kt = async (t, r, e) => {
  if (e instanceof HTMLCanvasElement)
    return new Promise((o, a) => {
      try {
        const s = new et(r, e, t);
        s.update(), s.hasAlpha = !0, o(s);
      } catch (s) {
        a(s);
      }
    });
  const n = await Je(e);
  return new Promise((o, a) => {
    try {
      const s = new I(n, t, !1, !0);
      s.name = r, s.hasAlpha = !0, s.onLoadObservable.addOnce(() => {
        o(s);
      });
    } catch (s) {
      a(s);
    }
  });
}, Qe = async (t, r) => {
  const e = bt.randomUuid(), { size: n, image: o, color: a } = t, s = v.CreatePlane(
    `plane-${e}`,
    {
      width: n,
      height: n
    },
    r
  ), i = new H(`material-${e}`, r);
  if (y(o)) {
    const l = await kt(r, `layer-${e}`, o);
    t._texture = l, t._mesh = s, t._material = i, l.hasAlpha = !0, i.opacityTexture = l, i.emissiveTexture = l;
  }
  return y(a) && (i.emissiveColor = S(a)), s.material = i, s;
}, qe = async (t, r) => {
  const e = new k(r);
  return await Promise.all(
    t.map(async (n, o) => {
      const a = await Qe(n, e);
      return a.position.set(0, 0, -o), a;
    })
  ), e;
}, je = ({ size: t } = { size: 4096 }) => {
  const r = G({ width: t, height: t }), e = r.getRenderingCanvas(), n = {
    layers: []
  }, o = {
    addLayer: (a) => (n.layers.push({ size: t, ...a }), o),
    render: async () => ze(async () => {
      const a = await qe(n.layers, r), s = new q("camera1", m(0, 0, -1e3), a);
      if (s.setTarget(m()), s.rotation = m(0, 0, Math.PI), s.mode = _.ORTHOGRAPHIC_CAMERA, s.minZ = 0, s.maxZ = 1e5, await st(a), o.clear(), !e)
        throw new Error("No canvas found", { cause: r });
      return _t(e);
    }, "Texture render"),
    clear: () => (n.layers.forEach((a) => {
      a?._cached || (a?._texture?.dispose(), a?._mesh?.dispose(), a?._material?.dispose());
    }), n.layers.length = 0, o)
  };
  return o;
}, it = (t, r) => {
  const e = t.getSize(), n = t.getContext();
  r(n, e), t.update();
}, tr = (t) => {
  it(t, (r, e) => {
    const { width: n, height: o } = e;
    r.clearRect(0, 0, n, o);
  });
}, er = (t, r = "DEBUG IMAGE") => {
  const e = Ut.copyToCanvas(t, 1024, 1024);
  e.style.border = "1px solid grey";
  const n = document.createElement("div");
  return n.textContent = r, document.body.appendChild(n), document.body.appendChild(e), new Promise((o, a) => {
    const s = () => {
      e.remove(), n.remove(), o(void 0);
    };
    e.onclick = s, n.onclick = s;
  });
}, rr = (t, r) => {
  const e = t.getTextureByName(r);
  e && (e.dispose(), t.removeTexture(e));
}, nr = (t, r = {}) => {
  const { color: e = "black" } = r;
  it(t, (n, o) => {
    const { width: a, height: s } = o;
    n.fillStyle = E.from(e).toString(), n.fillRect(0, 0, a, s);
  });
}, or = (t, r, e = {}) => {
  const {
    backgroundColor: n,
    outline: o = !0,
    color: a = "black",
    fontFamily: s = "monospace",
    fontStyle: i = "bold",
    outlineColor: l = E.builder({ color: "white" }).alpha(0.1).toString(),
    textureSize: c = Math.min(t.getSize().width, t.getSize().height)
  } = e;
  t.hasAlpha = !0;
  let h = c, p = `${i} ${h}px ${s}`;
  const u = t.getContext();
  u.font = p;
  let d = u.measureText(r);
  h = c / d.width * c, p = `${i} ${h}px ${s}`, u.font = p;
  const f = 0;
  d = u.measureText(r);
  const g = d.fontBoundingBoxAscent ?? 0, x = c - (c - g) / 2;
  u.lineWidth = h / 2;
  const M = {
    x: 0,
    y: x - h,
    width: c,
    height: g * 2
  };
  if (y(n)) {
    u.fillStyle = E.from(n).toString();
    const { x: C, y: W, width: Z, height: ct } = M;
    u.fillRect(C, W, Z, ct);
  }
  return o && (u.strokeStyle = l, u.strokeText(r, f, x)), u.fillStyle = a, u.fillText(r, f, x), t.hasAlpha = !0, t.update(), M;
}, Ht = {
  linearNearest: I.LINEAR_NEAREST,
  nearestNearest: I.NEAREST_NEAREST,
  linearLinear: I.LINEAR_LINEAR,
  nearestLinear: I.NEAREST_LINEAR
}, z = (t, r, e) => {
  const n = t.getTextureByName(r);
  return y(n) ? n : e();
}, V = (t, r) => {
  const { hasAlpha: e } = r;
  w(e, (n) => {
    t.hasAlpha = n;
  }), t instanceof et && t.update();
}, ar = (t, r, e = {}) => {
  const n = z(t, r, () => {
    const {
      generateMipMaps: o = !0,
      samplingMode: a = "linearNearest",
      width: s = 1024,
      height: i = 1024,
      init: l
    } = e, c = new et(
      r,
      {
        width: s,
        height: i
      },
      t,
      o,
      Ht[a]
    );
    return l && (l(c.getContext()), c.update()), c;
  });
  return V(n, e), n;
}, Ot = (t) => Ht[t], sr = (t, r, e) => z(t, r, () => {
  const {
    element: n,
    generateMipMaps: o = !0,
    samplingMode: a = "linearNearest"
  } = e;
  if (!n)
    throw new Error("HTML element is required to create texture", {
      cause: e
    });
  const s = new Jt(r, n, {
    generateMipMaps: o,
    samplingMode: Ot(a),
    engine: t.getEngine(),
    scene: t
  });
  return V(s, e), s;
}), ir = (t, r, e) => {
  const n = z(t, r, () => {
    const {
      src: o,
      generateMipMaps: a = !0,
      samplingMode: s = "linearNearest"
    } = e;
    if (!o)
      throw new Error("src is required", { cause: e });
    const i = new I(o, t, {
      samplingMode: Ot(s)
    });
    return i.name = r, i;
  });
  return V(n, e), n;
}, Ut = {
  builder: je,
  copyToCanvas: _t,
  debugImage: er,
  getTexture: z,
  getHtmlElementTexture: sr,
  getDynamicTexture: ar,
  getPathTexture: ir,
  updateTexture: V,
  imageToTexture: kt,
  drawTextOnTexture: or,
  drawOnTexture: it,
  drawBackgroundOnTexture: nr,
  clearTexture: tr,
  destroyTexture: rr
}, cr = (t, r, e) => {
  const n = t?.effectLayers?.length ? t.getGlowLayerByName(r) : void 0;
  return y(n) ? n : new Mt(r, t, e);
}, lr = (t, r, e) => {
  const n = t.getHighlightLayerByName(r);
  return y(n) ? n : new Qt(r, t, e);
}, Kr = {
  getGlowLayer: cr,
  getHighlightLayer: lr
}, $t = {
  getMaterial: O
  // updateMaterial,
  // updateStandardMaterial,
}, ur = (t, r) => {
  const e = t.getTransformNodeByName(r);
  return y(e) ? e : new qt(r, t);
}, Jr = {
  getTransformNode: ur
}, dr = (t) => {
  const r = t.metadata ?? {}, e = r.solidParticleSystems ?? {};
  return y(e) || (t.metadata = {
    ...r,
    solidParticleSystems: {}
  }), e;
}, Dt = (t, r, e) => {
  const n = dr(t), o = n[r];
  y(o);
  const a = e();
  return n[r] = a, a;
}, hr = (t, r, e) => Dt(t, r, () => new tt(r, t, {
  ...e
})), gr = (t, r, e = {}) => {
  const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), { material: i, onMeshBuild: l, ...c } = e;
  let h;
  const p = () => {
    h?.mesh?.dispose(), console.log("renewing sps instance", e), h = new tt(r, t, {
      ...c
    });
  };
  p();
  const u = {
    scene: t,
    getInstance: () => h,
    updateParticle: (d, f) => {
      const g = a.get(d);
      g && g.forEach((x) => {
        const M = h.particles[x];
        D.assertValue(M, `particle not found for ${x}`), f(M, x);
      });
    },
    removeMesh: (d) => {
      n.delete(d), u.rebuild();
    },
    addMesh: (d, f = 1) => {
      try {
        if (n.has(d))
          return;
        n.set(d, f), s.set(d.name, d), u.rebuild();
      } catch (g) {
        console.error(g);
      }
    },
    rebuild: () => {
      p(), o.clear();
      try {
        n.forEach((f, g) => {
          h.addShape(g, f);
          for (let x = 0; x < f; x++) {
            const M = h.particles.length - 1 - x;
            o.set(g, [
              ...o.get(g) || [],
              M
            ]), a.set(g.name, [
              ...o.get(g) || [],
              M
            ]);
          }
        });
        const d = h.buildMesh();
        i && (d.material = $t.getMaterial(t, i)), l?.(d), u.syncParticlestoMeshes();
      } catch (d) {
        console.error(d);
      }
    },
    syncParticlestoMeshes: () => {
      o.forEach((d, f) => {
        for (let g = 0; g < d.length; g++) {
          const x = d[g], M = D.assertValue(h.particles[x]);
          if (M.position.copyFrom(f.position), M.rotation.copyFrom(f.rotation), M.scaling.copyFrom(f.scaling), f.material instanceof H) {
            const C = f.material.diffuseColor;
            M.color = new Q(C.r, C.g, C.b, f.material.alpha);
          }
        }
      });
    },
    dispose: () => {
      n.clear(), o.clear(), a.clear(), s.clear(), h?.mesh?.dispose(), h.dispose();
    },
    update: () => {
      h.setParticles();
    }
  };
  return u;
}, fr = {
  getSolidParticleSystem: hr,
  getParticleSystem: Dt,
  Sps: gr
}, pr = (t, r, e) => new jt(m(t), m(r), e), mr = (t, r, e = {}) => {
  const {
    trianglePredicate: n,
    fastCheck: o,
    predicate: a = (s) => s.isPickable
  } = e;
  return t.pickWithRay(r, a, o, n);
}, Qr = {
  createRay: pr,
  pickWithRay: mr
}, yr = (t) => new k(t), wr = (t) => {
  t.debugLayer.isVisible() ? t.debugLayer.hide() : t.debugLayer.show();
}, qr = {
  createScene: yr,
  toggleInspector: wr,
  renderOnce: st
}, xr = (t) => {
  const r = t.getScene();
  t.dispose(), r.getLightsByTags("shadowCaster").forEach((n) => {
    n.metadata.shadowGenerator.removeShadowCaster(t);
  });
}, Mr = (t) => (t.getScene().getLightsByTags("shadowCaster").forEach((n) => {
  n.metadata.shadowGenerator.addShadowCaster(t);
}), () => {
  xr(t);
}), jr = {
  addShadowToMesh: Mr
}, br = (t, r, e = {}) => {
  const n = new Mt(r, t, e);
  return n.neutralColor = new Q(0, 0, 0, 0), n;
}, tn = {
  addGlowLayer: br,
  Constants: te
};
async function Tr({
  baseUrl: t,
  imageNames: r,
  atlasSize: e,
  padding: n = 0
}) {
  const o = document.createElement("canvas");
  o.width = e, o.height = e;
  const a = o.getContext("2d"), s = {}, i = [];
  let l = 0, c = 0, h = 0;
  for (const u of r) {
    const d = u.endsWith(".png") ? u : `${u}.png`, f = await Cr(`${t}/${d}`), g = f.width + n * 2, x = f.height + n * 2;
    if (l + g > e && (l = 0, c += h, h = 0), c + x > e)
      throw new Error(`Not enough space in atlas for image: ${d}`);
    a.drawImage(f, l + n, c + n), s[d] = {
      frame: {
        x: l + n,
        y: c + n,
        w: f.width,
        h: f.height
      }
    }, i.push({
      filename: d,
      frame: {
        x: l + n,
        y: c + n,
        w: f.width,
        h: f.height
      },
      rotated: !1,
      trimmed: !1,
      spriteSourceSize: { x: 0, y: 0, w: f.width, h: f.height },
      sourceSize: { w: f.width, h: f.height }
    }), l += g, h = Math.max(h, x);
  }
  const p = await new Promise(
    (u) => o.toBlob((d) => u(d), "image/png")
  );
  return {
    canvas: o,
    atlasBlob: p,
    spritePackageManagerJson: { frames: s },
    babylonSpriteMapJson: { frames: i }
  };
}
async function Cr(t) {
  return new Promise((r, e) => {
    const n = new Image();
    n.src = t, n.onload = () => r(n), n.onerror = (o) => e(new Error(`Failed to load image: ${t}`));
  });
}
const Sr = (t, r, e = {}) => {
  const n = t?.spriteManagers?.find((u) => u.name === r);
  if (y(n))
    return n;
  const {
    capacity: o = 1,
    atlasUrl: a,
    atlasBlob: s,
    epsilon: i,
    samplingMode: l,
    spriteJSON: c,
    options: h
  } = e;
  let p;
  try {
    s && (p = URL.createObjectURL(s));
    const u = y(a) ? a : p;
    if (B(u))
      throw new Error("altasUrl or atlasBlob is required", { cause: e });
    return new ee(
      r,
      u,
      o,
      t,
      c,
      i,
      l,
      h
    );
  } finally {
    p && URL.revokeObjectURL(p);
  }
}, Gt = (t, r, e = {}) => {
  const n = t?.spriteManagers?.find((f) => f.name === r);
  if (y(n))
    return n;
  const {
    capacity: o = 1,
    cellSize: a = 64,
    atlasUrl: s,
    atlasBlob: i,
    epsilon: l,
    samplingMode: c,
    fromPacked: h,
    spriteJSON: p,
    options: u
  } = e;
  let d;
  try {
    i && (d = URL.createObjectURL(i));
    const f = y(s) ? s : d;
    if (B(f))
      throw new Error("altasUrl or atlasBlob is required", { cause: e });
    return new re(
      r,
      f,
      o,
      a,
      t,
      l,
      c,
      h,
      p,
      u
    );
  } finally {
    d && URL.revokeObjectURL(d);
  }
}, Er = (t, r, e) => {
  const n = ce(Gt(t, e)), o = n?.sprites?.find((a) => a.name === r);
  return y(o) ? o : new ne(r, n);
}, en = {
  getSpriteManager: Gt,
  getSprite: Er,
  createTextureAtlas: Tr,
  getSpritePackedManager: Sr
}, Pr = (t, r = {}) => {
  const {
    random: e = bt.globalRandom,
    radius: n = 1,
    maxBounce: o = 0,
    groundZ: a = 0,
    speed: s = 20,
    decay: i = 0.01,
    dispose: l = () => t.isVisible = !1
  } = r;
  {
    const c = t.props?.path;
    if (y(c) && c.length > 0) {
      const h = c.pop();
      if (!h)
        throw new Error("No next value from path", { cause: c });
      t.position = h;
      return;
    }
  }
  {
    const { bounces: c = o } = t.props ?? {};
    if (c <= 0) {
      e() < i && l();
      return;
    }
    const h = c / o, p = t.position, [u, d, f] = N(p), g = (Wt) => (e() * n * 2 - n) * (h / 4) + Wt, [x, M] = [g(u), g(d)], C = m([x, M, a]), [W, Z, ct] = N($.midPoint3(p, C)), Ft = m(W, Z, f - e() * h * 3), zt = {
      path: oe.CreateCatmullRomSpline([p, Ft, C], s).getPoints().reverse(),
      bounces: c - 1
      // rotationAxis: [2 * random() - 1, 2 * random() - 1, 2 * random() - 1],
    }, Vt = t.props ?? {};
    t.props = { ...Vt, ...zt };
  }
};
class A {
  /**
   * Evaluate a query
   * @param query defines the query to evaluate
   * @param evaluateCallback defines the callback used to filter result
   * @returns true if the query matches
   */
  static Eval(r, e) {
    return r.match(/\([^()]*\)/g) ? r = r.replace(/\([^()]*\)/g, (n) => (n = n.slice(1, n.length - 1), A._HandleParenthesisContent(n, e))) : r = A._HandleParenthesisContent(r, e), r === "true" ? !0 : r === "false" ? !1 : A.Eval(r, e);
  }
  static _HandleParenthesisContent(r, e) {
    e = e || ((a) => a === "true");
    let n;
    const o = r.split("||");
    for (const a in o)
      if (Object.prototype.hasOwnProperty.call(o, a)) {
        let s = A._SimplifyNegation(o[a].trim());
        const i = s.split("&&");
        if (i.length > 1)
          for (let l = 0; l < i.length; ++l) {
            const c = A._SimplifyNegation(i[l].trim());
            if (c !== "true" && c !== "false" ? c[0] === "!" ? n = !e(c.substring(1)) : n = e(c) : n = c === "true", !n) {
              s = "false";
              break;
            }
          }
        if (n || s === "true") {
          n = !0;
          break;
        }
        s !== "true" && s !== "false" ? s[0] === "!" ? n = !e(s.substring(1)) : n = e(s) : n = s === "true";
      }
    return n ? "true" : "false";
  }
  static _SimplifyNegation(r) {
    return r = r.replace(/^[\s!]+/, (e) => (e = e.replace(/[\s]/g, () => ""), e.length % 2 ? "!" : "")), r = r.trim(), r === "!true" ? r = "false" : r === "!false" && (r = "true"), r;
  }
}
class T {
  /**
   * Adds support for tags on the given object
   * @param obj defines the object to use
   */
  static EnableFor(r) {
    r._tags = r._tags || {}, r.hasTags = () => T.HasTags(r), r.addTags = (e) => T.AddTagsTo(r, e), r.removeTags = (e) => T.RemoveTagsFrom(r, e), r.matchesTagsQuery = (e) => T.MatchesQuery(r, e);
  }
  /**
   * Removes tags support
   * @param obj defines the object to use
   */
  static DisableFor(r) {
    delete r._tags, delete r.hasTags, delete r.addTags, delete r.removeTags, delete r.matchesTagsQuery;
  }
  /**
   * Gets a boolean indicating if the given object has tags
   * @param obj defines the object to use
   * @returns a boolean
   */
  static HasTags(r) {
    if (!r._tags)
      return !1;
    const e = r._tags;
    for (const n in e)
      if (Object.prototype.hasOwnProperty.call(e, n))
        return !0;
    return !1;
  }
  /**
   * Gets the tags available on a given object
   * @param obj defines the object to use
   * @param asString defines if the tags must be returned as a string instead of an array of strings
   * @returns the tags
   */
  static GetTags(r, e = !0) {
    if (!r._tags)
      return null;
    if (e) {
      const n = [];
      for (const o in r._tags)
        Object.prototype.hasOwnProperty.call(r._tags, o) && r._tags[o] === !0 && n.push(o);
      return n.join(" ");
    } else
      return r._tags;
  }
  /**
   * Adds tags to an object
   * @param obj defines the object to use
   * @param tagsString defines the tag string. The tags 'true' and 'false' are reserved and cannot be used as tags.
   * A tag cannot start with '||', '&&', and '!'. It cannot contain whitespaces
   */
  static AddTagsTo(r, e) {
    if (!e || typeof e != "string")
      return;
    const n = e.split(" ");
    for (const o of n)
      T._AddTagTo(r, o);
  }
  /**
   * @internal
   */
  static _AddTagTo(r, e) {
    e = e.trim(), !(e === "" || e === "true" || e === "false") && (e.match(/[\s]/) || e.match(/^([!]|([|]|[&]){2})/) || (T.EnableFor(r), r._tags[e] = !0));
  }
  /**
   * Removes specific tags from a specific object
   * @param obj defines the object to use
   * @param tagsString defines the tags to remove
   */
  static RemoveTagsFrom(r, e) {
    if (!T.HasTags(r))
      return;
    const n = e.split(" ");
    for (const o in n)
      T._RemoveTagFrom(r, n[o]);
  }
  /**
   * @internal
   */
  static _RemoveTagFrom(r, e) {
    delete r._tags[e];
  }
  /**
   * Defines if tags hosted on an object match a given query
   * @param obj defines the object to use
   * @param tagsQuery defines the tag query
   * @returns a boolean
   */
  static MatchesQuery(r, e) {
    return e === void 0 ? !0 : e === "" ? T.HasTags(r) : A.Eval(e, (n) => T.HasTags(r) && r._tags[n]);
  }
}
const vr = (t, r, e) => {
  const { XYZI: n, RGBA: o } = r, a = o.map((i) => {
    const { r: l, g: c, b: h, a: p } = i;
    return E.builder({ color: [l, c, h, p], model: "rgba" }).toString();
  }), s = new L(e, t);
  return n.map((i, l) => {
    const c = a[i.i], h = Rt(t, `voxel-${c}`, {
      color: c,
      material: `voxel-material-${c}`
    });
    return h.position = m(i), h.parent = s, h;
  }), T.AddTagsTo(s, "complex"), s;
}, Rr = (t) => {
  const r = Object.entries(t).sort((e, n) => {
    const [o] = e, [a] = n;
    return o.localeCompare(a);
  });
  return JSON.stringify(r);
}, Ar = (t) => {
  const r = {};
  return t.forEach((e) => {
    const n = e?.material?.name;
    if (!n)
      throw new Error("Mesh material is missing name", { cause: e });
    const o = r[n] ?? [];
    o.push(e), r[n] = o;
  }), r;
}, Ir = (t, r, e) => {
  const { XYZI: n, RGBA: o } = r, a = o.map((u) => {
    const { r: d, g: f, b: g, a: x } = u;
    return E.builder({ color: [d, f, g, x], model: "rgba" }).toString();
  }), s = n.map((u, d) => {
    const f = a[u.i], [g, x, M] = N(u), C = vt(
      t,
      `voxel-merged-${f}-${Rr(u)}`,
      {
        position: [g, x, M],
        // color,
        // material: `voxel-merged-material-${color}`,
        material: "voxel-material",
        colors: ie.from(6).map(() => f)
      }
    );
    return C.setEnabled(!1), C;
  }), i = Ar(s), l = Object.values(i).map((u) => It(u)), c = new L(`merged-${e}`, t);
  l.filter(y).forEach((u) => u.parent = c);
  const h = O(t, "voxel-material", "standard");
  l.filter(y).forEach((u) => u.material = h), c.metadata = {
    voxels: s
  }, T.AddTagsTo(c, "merged");
  const p = new L(e, t);
  return p.metadata = {
    voxels: s
  }, c.parent = p, p;
}, rn = {
  animateExplosion: Pr,
  voxDataToSps: At,
  voxDataToMergedModel: Ir,
  voxDataToComplexModel: vr
}, Lr = ({
  engine: t,
  canvas: r
}) => {
  const e = new b.Scene(t);
  console.log(e), new b.ArcRotateCamera(
    "ArcRotateCamera",
    -Math.PI / 2,
    Math.PI / 2.2,
    50,
    new b.Vector3(0, 0, 0),
    e
  ).attachControl(r, !0), new b.HemisphericLight(
    "light",
    new b.Vector3(0, 1, -1),
    e
  );
  const o = new b.StandardMaterial("mat");
  o.diffuseTexture = new b.Texture("textures/earth.jpg");
  const a = new b.StandardMaterial("mat"), s = new b.Texture("textures/fire.jpg");
  a.diffuseTexture = s;
  const i = new b.SolidParticleSystem("SPS", e, {
    useModelMaterial: !0
  }), l = b.MeshBuilder.CreateBox("FOO");
  return l.material = o, i.addShape(l, 1e4), i.buildMesh(), i.initParticles = () => {
    for (let h = 0; h < i.nbParticles; h++) {
      const p = i.particles[h];
      p.position.x = b.Scalar.RandomRange(-20, 20), p.position.y = b.Scalar.RandomRange(-20, 20), p.position.z = b.Scalar.RandomRange(-20, 20);
    }
  }, i.initParticles(), i.setParticles(), { scene: e, update: () => {
    const h = Math.sin(Date.now() * 5e-3);
    i.particles.forEach((p, u) => {
      u > 20 ? (p.rotation.x = h, o.alpha = h, o.diffuseTexture = s) : p.rotation.y = h;
    }), i.setParticles();
  } };
}, Br = ({
  engine: t,
  canvas: r
}) => {
  const e = new b.Scene(t);
  console.log(e), Et.getArcRotateCamera(e, "ArcRotateCamera", {
    alpha: -Math.PI / 2,
    beta: Math.PI / 2.2,
    radius: 50,
    target: [0, 0, 0]
  }).attachControl(r, !0), Pt.getHemisphericLight(e, "light", {
    direction: [0, 1, -1]
  });
  const o = Ut.getPathTexture(e, "tex", {
    src: "/images/test.jpg"
  }), a = $t.getMaterial(e, "mat", {
    opacityTexture: o.name
    // diffuseColor: Colors.from("red").alpha(0.99).toString(),
    // alpha: 0.99,
  }), s = Bt.getBox(
    e,
    "box1"
    //  { material: mat.name }
  ), i = fr.Sps(e, "sps", {
    material: a.name,
    updatable: !0,
    // enableDepthSort: true,
    onMeshBuild: (c) => {
      c.useVertexColors = !0, c.hasVertexAlpha = !0;
    }
  });
  return i.addMesh(s, 1e4), i.updateParticle("box1", (c, h) => {
    c.position.x = b.Scalar.RandomRange(-20, 20), c.position.y = b.Scalar.RandomRange(-20, 20), c.position.z = b.Scalar.RandomRange(-20, 20);
  }), { scene: e, update: () => {
    const c = Math.sin(Date.now() * 5e-3), h = ue.noiseStream(0);
    i.updateParticle("box1", (p, u) => {
      p.color = new b.Color4(h(), h(), h(), 0.5), Math.random() > 0.5 ? p.rotation.x = h() * c : p.rotation.y = h() * c;
    }), i.update();
  } };
}, nn = {
  spsDebug: Lr,
  spsDebug2: Br
};
export {
  Zr as Babs,
  ht as CAMERA_MODES,
  Et as Cameras,
  nn as Debugs,
  Yr as Engines,
  Kr as Layers,
  Pt as Lights,
  $t as Materials,
  Bt as Meshes,
  Xr as Models,
  Jr as Nodes,
  fr as Particles,
  Qr as Rays,
  qr as Scenes,
  jr as Shadows,
  tn as Specials,
  en as Sprites,
  Ut as Textures,
  rn as Voxels,
  br as addGlowLayer
};
