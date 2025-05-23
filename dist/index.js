import { Inputs as $ } from "@mjt-engine/input";
import { toVec3 as k, Maths as F, toVec2 as pe } from "@mjt-engine/math";
import * as b from "@babylonjs/core";
import { Vector3 as X, Engine as Xe, Color3 as me, Color4 as G, Matrix as ye, Scene as H, UniversalCamera as j, Camera as O, TargetCamera as Ke, ArcRotateCamera as ee, HemisphericLight as xe, PointLight as we, StandardMaterial as U, PBRMaterial as Je, Mesh as A, MeshBuilder as v, SolidParticleSystem as te, InstancedMesh as Qe, Texture as L, WebGPUEngine as Me, SceneLoader as ue, DynamicTexture as re, HtmlElementTexture as qe, GlowLayer as be, HighlightLayer as je, TransformNode as et, Ray as tt, Constants as rt, SpritePackedManager as nt, SpriteManager as at, Sprite as ot, Curve3 as st } from "@babylonjs/core";
import { Colors as E } from "@mjt-engine/color";
import { isUndefined as N, isDefined as x, iff as w, tuple2 as it, tuple3 as ct, Arrays as lt } from "@mjt-engine/object";
import { extent as de } from "d3-array";
import { Asserts as _, assertValue as ut } from "@mjt-engine/assert";
import { Randoms as Te } from "@mjt-engine/random";
import { Images as dt } from "@mjt-engine/image";
import "@babylonjs/inspector";
import { Noises as ht } from "@mjt-engine/noise";
function y(e = 0, r = 0, t = 0) {
  if (typeof e == "number")
    return new X(e, r, t);
  const [n = 0, a = 0, o = 0] = k(e);
  return new X(n, a, o);
}
const Ce = (e, r) => {
  const t = e.alpha, n = e.beta, a = e.radius;
  e.target = e.target.add(y(r)), e.radius = a, e.alpha = t, e.beta = n;
}, Se = (e, r = {}) => {
  const {
    keySensitivity: t = 0.5,
    mouseSensitivity: n = 0.05,
    parent: a = document.body,
    action: o = () => {
    }
  } = r, s = e.alpha, i = e.beta, l = e.radius;
  y(e.target);
  const c = (f = 0, u = 0, h = 0) => {
    Ce(e, [f, u, h]), o();
  }, p = $.listenToKey(
    {
      // Y up
      w: () => {
        c(-t / 2, t / 2, 0);
      },
      "shift+w": () => {
        e.radius -= t;
      },
      // X left
      a: () => {
        c(-t / 2, -t / 2, 0);
      },
      "shift+s": () => {
        e.radius += t;
      },
      // Y down
      s: () => {
        c(t / 2, -t / 2, 0);
      },
      // X right
      d: () => {
        c(t / 2, t / 2, 0);
      },
      v: () => {
        e.beta = e.beta + t / 8, o();
      },
      z: () => {
        e.beta = e.beta - t / 8, o();
      },
      c: () => {
        e.alpha = s, e.beta = i, e.radius = l, o();
      },
      "shift+d": () => {
        e.alpha = e.alpha + t / 8, o();
      },
      "shift+a": () => {
        e.alpha = e.alpha - t / 8, o();
      }
    },
    {
      autoUp: !1,
      parent: a
    }
  ), g = {
    lastPosition: void 0
  };
  a.addEventListener("pointerdown", (f) => {
    f.buttons === 4 && (g.lastPosition = f);
  }), a.addEventListener("pointermove", (f) => {
    if (f.buttons !== 4)
      return;
    const { lastPosition: u = f } = g;
    g.lastPosition = f;
    const h = F.subtract2(u, f), [m, M] = pe(h);
    if (f.buttons === 4 && f.shiftKey) {
      e.beta = e.beta + M * n;
      return;
    }
    f.buttons === 4 && (c(M * n, -M * n, 0), c(m * n, m * n, 0));
  });
  const d = $.listenToMouse(
    {
      wheel: (f) => {
        if (f instanceof WheelEvent) {
          const u = f.deltaY * n;
          e.radius += u, o();
        }
      }
    },
    {
      parent: a
    }
  );
  return [p, d];
}, Ee = ({
  width: e = 320,
  height: r = 320
}) => {
  const t = document.createElement("canvas");
  return t.width = e, t.height = r, t;
}, V = (e) => {
  const r = e instanceof HTMLCanvasElement || e instanceof OffscreenCanvas ? {} : e ?? {}, t = e instanceof HTMLCanvasElement || e instanceof OffscreenCanvas ? e : Ee({
    width: e?.width ?? 320,
    height: e?.height ?? 320
  }), { antialias: n } = r, a = new Xe(t, n, {
    powerPreference: "high-performance",
    ...r
  });
  return a.hideLoadingUI(), a;
}, S = (e) => {
  const r = E.builder({ color: e }).hex();
  return me.FromHexString(r);
}, z = (e) => {
  const r = E.builder({ color: e }), t = G.FromHexString(r.hex());
  return t.a = r.alpha(), t;
}, he = (e, r, t, n = {}) => {
  const { camera: a = e.activeCamera, predicate: o = () => !0 } = n, s = e.createPickingRay(r, t, ye.Identity(), a);
  return e.pickWithRay(s, o)?.pickedMesh;
}, K = (e, r) => {
  if (e instanceof H)
    return e.meshes.forEach((t) => K(t, r));
  r(e), e.getChildMeshes().forEach((t) => K(t, r));
}, gt = (e, r = {}) => {
  const {
    keySensitivity: t = 0.05,
    mouseSensitivity: n = 0.05,
    parent: a = document.body
  } = r;
  $.listenToKey(
    {
      w: () => {
        e.position.addInPlace(y(0, 0, -t));
      },
      a: () => {
        e.rotation.y -= t / 2;
      },
      s: () => {
        e.position.addInPlace(y(0, 0, t));
      },
      d: () => {
        e.rotation.y += t / 2;
      },
      i: () => {
        e.position.addInPlace(y(0, t, 0));
      },
      j: () => {
        e.position.addInPlace(y(t, 0, 0));
      },
      k: () => {
        e.position.addInPlace(y(0, -t, 0));
      },
      l: () => {
        e.position.addInPlace(y(-t, 0, 0));
      }
    },
    {
      propagate: !1,
      parent: a
    }
  ), $.listenToMouse(
    {
      wheel: (o) => {
        if (o instanceof WheelEvent) {
          if (o.shiftKey) {
            const i = o.deltaX * n;
            e.position.addInPlace(y(0, -i, 0));
            return;
          }
          const s = o.deltaY * n;
          e.position.addInPlace(y(0, 0, s));
        }
      },
      click: (o) => {
        if (o.buttons === 0) {
          const s = o, i = e.getScene(), l = he(i, s.layerX, s.layerY);
          x(l) && (console.log({ mesh: l }), K(i, (c) => {
            N(c.material) || c.material && (c.material.wireframe = !1);
          }), l.material && (l.material.wireframe = !0));
        }
      },
      auxclick: (o) => {
        if (o.button !== 1)
          return;
        const s = e.getScene(), i = he(s, o.clientX, o.clientY);
        N(i);
      },
      contextmenu: (o) => {
        console.log("should context");
      }
    },
    {
      propagate: !1,
      parent: a
    }
  );
}, ft = (e, r, {
  unitsTall: t = 1,
  unitsWide: n = 1,
  cameraLevel: a = -100,
  disposeActive: o = !1
} = {}) => {
  o && e?.activeCamera?.dispose();
  const s = new j(r, y(0, 0, a), e);
  return s.target = y(0, 0, 0), s.rotation = y(0, 0, Math.PI), s.orthoTop = -t / 2, s.orthoBottom = t / 2, s.orthoLeft = n / 2, s.orthoRight = -n / 2, s.mode = O.ORTHOGRAPHIC_CAMERA, s;
}, ne = (e, r, t) => {
  const n = e.getCameraByName(r);
  return x(n) ? n : t();
}, ae = (e, r) => {
  const {
    alpha: t,
    beta: n,
    radius: a,
    target: o,
    position: s,
    rotation: i,
    minZ: l,
    maxZ: c,
    mode: p,
    orthoTop: g,
    orthoBottom: d,
    orthoLeft: f,
    orthoRight: u
  } = r;
  w(s, (h) => {
    e.position = y(h);
  }), w(l, (h) => {
    e.minZ = h;
  }), w(c, (h) => {
    e.maxZ = h;
  }), w(p, (h) => {
    e.mode = ge[h];
  }), w(p, (h) => {
    e.mode = ge[h];
  }), w(g, (h) => {
    e.orthoTop = h;
  }), w(d, (h) => {
    e.orthoBottom = h;
  }), w(f, (h) => {
    e.orthoLeft = h;
  }), w(u, (h) => {
    e.orthoRight = h;
  }), e instanceof Ke && (w(i, (h) => {
    e.rotation = y(h);
  }), w(o, (h) => {
    e.target = y(h);
  })), e instanceof ee && (w(t, (h) => {
    e.alpha = h;
  }), w(n, (h) => {
    e.beta = h;
  }), w(a, (h) => {
    e.radius = h;
  }));
}, pt = (e, r, t = {}) => {
  const n = ne(e, r, () => {
    const { alpha: a = 0, beta: o = 0, radius: s = 2, target: i } = t;
    return new ee(r, a, o, s, y(i), e);
  });
  return ae(n, t), n;
}, mt = (e, r, t = {}) => {
  const n = ne(e, r, () => {
    const { position: a } = t;
    return new j(r, y(a), e);
  });
  return ae(n, t), n;
}, yt = (e, r) => {
  e?.activeCamera?.dispose();
  const t = e.getEngine().getRenderingCanvas(), n = -Math.PI / 2, a = Math.PI / 2.5, o = new ee(r, n, a, 15, y(0, 0, 0), e);
  o.attachControl(t, !0), o.mode = O.PERSPECTIVE_CAMERA;
}, ge = {
  orthographic: O.ORTHOGRAPHIC_CAMERA,
  perspective: O.PERSPECTIVE_CAMERA
}, Pe = {
  getArcRotateCamera: pt,
  getCamera: ne,
  updateCamera: ae,
  getUniversalCamera: mt,
  attachArcRotateCameraControls: Se,
  attachUniversalCameraControls: gt,
  createTopDownCamera: ft,
  createDebugCamera: yt
}, oe = (e, r, t) => {
  const n = e.getLightByName(r);
  return x(n) ? n : t();
}, se = (e, r) => {
  const { intensity: t, direction: n, position: a } = r;
  w(t, (o) => {
    e.intensity = o;
  }), e instanceof xe && w(n, (o) => {
    e.direction = y(o);
  }), e instanceof we && w(a, (o) => {
    e.position = y(o);
  });
}, xt = (e, r, t = {}) => {
  const n = oe(e, r, () => {
    const { direction: a } = t;
    return new xe(r, y(a), e);
  });
  return se(n, t), n;
}, wt = (e, r, t = {}) => {
  const n = oe(e, r, () => {
    const { position: a } = t;
    return new we(r, y(a), e);
  });
  return se(n, t), n;
}, ve = {
  getLight: oe,
  getHemisphericLight: xt,
  getPointLight: wt,
  updateLight: se
}, P = (e, r, t, n = !1) => {
  const a = e.getMeshByName(r);
  return x(a) && !n ? a : x(a) && n ? t(a) : t();
}, Re = (e, r, t) => {
  const {
    alpha: n,
    diffuseTexture: a,
    emissiveTexture: o,
    ambientTexture: s,
    opacityTexture: i,
    diffuseColor: l,
    specularColor: c,
    ambientColor: p,
    emissiveColor: g
  } = t;
  w(a, (d) => {
    const f = e.getTextureByName(d);
    r.diffuseTexture = f;
  }), w(o, (d) => {
    const f = e.getTextureByName(d);
    r.emissiveTexture = f;
  }), w(s, (d) => {
    const f = e.getTextureByName(d);
    r.ambientTexture = f;
  }), w(i, (d) => {
    const f = e.getTextureByName(d);
    r.opacityTexture = f;
  }), w(l, (d) => {
    r.diffuseColor = S(d);
    const f = E.from(d).alpha();
    f < 1 && (r.alpha = f);
  }), w(c, (d) => {
    r.specularColor = S(d);
  }), w(p, (d) => {
    r.ambientColor = S(d);
  }), w(g, (d) => {
    r.emissiveColor = S(d);
  }), w(n, (d) => {
    r.alpha = d;
  });
}, J = (e, r, t) => {
  r instanceof U && Re(e, r, t);
}, D = (e, r, t = "standard") => {
  const n = e.getMaterialByName(r);
  if (x(n))
    return n;
  const a = typeof t == "string" ? t : t?.type ?? "standard";
  switch (a) {
    case "standard": {
      const o = new U(r, e);
      return J(e, o, t), o;
    }
    case "pbr": {
      const o = new Je(r, e);
      return J(e, o, t), o;
    }
    default:
      throw new Error(`Unknown material type: '${a}'`);
  }
}, R = (e, r, t) => {
  const { position: n, color: a, material: o, receiveShadows: s } = t;
  r instanceof A && x(o) && (r.material = D(e, o, "standard")), r instanceof A && x(s) && (r.receiveShadows = s), w(n, (i) => {
    r.position = y(i);
  }), w(a, (i) => {
    const l = r.material;
    if (l instanceof U) {
      l.diffuseColor = S(i);
      const c = E.from(i).alpha();
      c < 1 && (l.alpha = c), l.specularColor = S("black"), l.ambientColor = S(i), l.emissiveColor = S(i);
    }
  });
}, Ae = (e, r, t = {}) => P(e, r, () => {
  const { width: n = 1, height: a = 1, depth: o = 1, colors: s } = t, i = v.CreateBox(
    r,
    {
      width: n,
      height: a,
      depth: o,
      faceColors: x(s) ? s.map(z) : void 0
    },
    e
  );
  return R(e, i, t), i;
}), Ie = (e, r, t) => {
  const {
    width: n = 1,
    height: a = 1,
    depth: o = 1,
    material: s,
    receiveShadows: i = !1
  } = t, l = `box-instance-root-${JSON.stringify([
    n,
    a,
    o,
    s,
    i
  ])}`;
  let c = e.getMeshByName(l);
  if (N(c)) {
    if (c = v.CreateBox(l, { width: n, height: a, depth: o }, e), c.receiveShadows = i, c.isVisible = !1, !s)
      throw new Error("No material", { cause: t });
    c.material = D(e, s, "standard");
  }
  const p = c.createInstance(r);
  return R(e, p, t), p;
}, Mt = (e, r, t) => {
  const { radius: n = 0.5 } = t;
  return P(e, r, () => {
    const a = v.CreateSphere(
      r,
      { diameter: n * 2 },
      e
    );
    return R(e, a, t), a;
  });
}, bt = (e, r, t, n = {}) => {
  const {
    predicate: a = (l) => l.isPickable,
    camera: o = e.activeCamera
  } = n, s = e.createPickingRay(r, t, ye.Identity(), o);
  return e.pickWithRay(s, a)?.pickedMesh;
}, Tt = (e) => {
  e.computeWorldMatrix(!0), e.refreshBoundingInfo({});
  const [r, t, n] = k(e.getAbsolutePosition()), a = e.getBoundingInfo().boundingSphere.radius;
  return [r, t, n - a];
}, Q = (e, r) => {
  if (e instanceof H)
    return e.meshes.forEach((t) => Q(t, r));
  r(e), e.getChildMeshes().forEach((t) => Q(t, r));
}, Ct = {
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
}, St = (e, r, t = {}) => P(e, r, () => {
  const { size: n = 1, type: a = "tetrahedron" } = t, o = v.CreatePolyhedron(
    r,
    { type: Ct[a], size: n },
    e
  );
  return R(e, o, t), o;
}), Et = (e) => {
  const r = e.getBoundingInfo().boundingBox.vectors, t = e.getScene(), n = t.getEngine().getRenderingCanvas();
  if (!n)
    throw new Error("No canvas for scene", { cause: t });
  const a = e.getWorldMatrix(), o = t.getTransformMatrix(), s = t.activeCamera.viewport, i = r.map((f) => {
    const u = X.Project(f, a, o, s);
    return u.x = u.x * n.clientWidth, u.y = u.y * n.clientHeight, u;
  }), [l, c] = de(i, (f) => f.x), [p, g] = de(i, (f) => f.y);
  return {
    width: c - l,
    height: g - p,
    left: l,
    top: p,
    right: c,
    bottom: g
  };
}, Pt = (e, r, t = {}) => {
  const {
    recurse: n = !0,
    disposeMaterials: a = !1,
    disposeTextures: o = !1
  } = t, s = e.getMeshByName(r);
  if (s) {
    if (s.dispose(!n, !1), a) {
      const i = s.material;
      if (!i)
        return;
      i.name = `DISPOSED-${i.name}`, i?.dispose(!0, o), e.removeMaterial(i);
    }
    e.removeMesh(s);
  }
}, vt = (e) => {
  if (!N(e))
    return e.sort((r, t) => r.distance - t.distance), e[0];
}, Rt = (e, r, t = {}) => P(e, r, () => {
  const { arc: n = 1, height: a = 1, radius: o = 0.5, tag: s } = t, i = v.CreateCylinder(
    r,
    {
      height: a,
      arc: n,
      diameter: o * 2
    },
    e
  );
  return R(e, i, t), i;
}), At = (e, r, t) => {
  const { updatable: n = !1 } = t;
  return P(
    e,
    r,
    (a) => It(e, r, {
      ...t,
      instance: a
      // updatable: undefined,
    }),
    n
  );
}, It = (e, r, t) => {
  const {
    colors: n = [],
    points: a = [],
    color: o = "white",
    updatable: s = !1,
    useVertexAlpha: i,
    instance: l
  } = t, c = a.map((d, f) => n[f] ?? o).map((d) => z(d)), p = a.map((d) => y(d)), g = v.CreateLines(r, {
    points: p,
    colors: c,
    updatable: s,
    useVertexAlpha: i,
    instance: l
  });
  return R(e, g, t), g;
}, q = (e, r, t) => {
  const n = e.getMeshByName(r);
  return x(n) ? Promise.resolve(n) : t();
}, Bt = (e, r, t, n) => P(e, r, () => {
  const a = P(e, t, n);
  return _.assertValue(a, () => (console.log({ scene: e, name: r, rootName: t, producer: n }), "Unable to create mesh instance. Missing root mesh.")), a.createInstance(r);
}), Lt = async (e, r, t, n) => q(e, r, async () => {
  const a = await q(e, t, n);
  return _.assertValue(a, () => (console.log({ scene: e, name: r, rootName: t, producer: n }), "Unable to create mesh instance. Missing root mesh.")), a.createInstance(r);
}), Nt = (e, r, t = {}) => P(e, r, () => {
  const { width: n = 1, height: a = 1, tag: o, doubleSided: s } = t, i = v.CreatePlane(
    r,
    {
      width: n,
      height: a,
      sideOrientation: s ? A.DOUBLESIDE : void 0
    },
    e
  ), { billboard: l } = t;
  return l && (i.billboardMode = A.BILLBOARDMODE_ALL), R(e, i, t), i;
}), _t = (e, r, t = {}) => P(e, r, () => {
  const { radius: n = 0.5 } = t, a = v.CreateTorusKnot(r, { radius: n }, e);
  return R(e, a, t), a;
}), kt = (e) => {
  const { XYZI: r, SIZE: t } = e, n = t.z, a = 1 / n / 2, o = 1 / n / 2, s = 1 / n / 2;
  return r.map((i) => {
    const [l, c, p] = k(i), g = (l - t.x / 2) / n + a, d = (c - t.y / 2) / n + o, f = (p - t.z / 2) / -n - s;
    return it(ct(g, d, f), i.i);
  });
}, Be = (e, r, t) => {
  const { XYZI: n, RGBA: a, SIZE: o } = r, s = a.map((g) => {
    const { r: d, g: f, b: u, a: h } = g;
    return E.builder({ color: [d, f, u, h], model: "rgba" }).toString();
  }), i = new te(t, e), l = 1 / o.z, c = v.CreateBox("temp-box", {
    width: l,
    height: l,
    depth: l
  });
  i.addShape(c, n.length), i.buildMesh(), c.dispose(), kt(r).forEach((g, d) => {
    const [f, u] = g, h = i.particles[d];
    h.position = y(f);
    const m = s[u];
    h.color = z(m);
  });
  const p = D(e, "vox-material", "standard");
  return p.specularColor = S("black"), i.mesh.material = p, i.setParticles(), i;
}, Ot = (e, r, t, n = {}) => {
  const a = e.metadata ?? {}, { voxes: o = {} } = a, s = o[t];
  if (N(s))
    throw console.log({ scene: e, name: r, src: t }), new Error(`No voxData found for ${t} ${r}`);
  const i = Be(e, s, r), l = i.mesh;
  return R(e, l, n), i;
}, Ht = (e) => e instanceof Qe, Ut = (e, r) => {
  const [t, n] = pe(F.normalize2(F.subtract2(r, e)));
  return Math.atan2(n, t) + Math.PI / 2;
}, Le = (e, r = {}) => {
  const {
    disposeSource: t = !1,
    allow32BitsIndices: n = !0,
    meshSubclass: a = void 0,
    subdivideWithSubMeshes: o = !1,
    multiMultiMaterials: s = !1
  } = r;
  return A.MergeMeshes(
    e,
    t,
    n,
    a,
    o,
    s
  );
}, Dt = (e, r, t, n = {}) => {
  const {
    predicate: a = (s) => s.isPickable,
    camera: o = e.activeCamera
  } = n;
  if (!o)
    throw new Error("Camera required");
  return e.multiPick(r, t, a, o);
}, Ne = (e, r = /.*/, t = 0) => {
  const n = "".padStart(t * 2);
  if (r.test(e.name)) {
    console.log(`${n}mesh: '${e.name}'`);
    const a = e.material;
    x(a) && Object.entries(a).filter(
      (s) => /.Texture$/.test(s[0])
    ).map((s) => {
      const [i, l] = s;
      l instanceof L && i !== "_environmentBRDFTexture" && console.log(`${n}tex: '${l.name}' (${i})`);
    });
  }
  e.getChildMeshes().map((a) => Ne(a, r, t + 1));
}, _e = {
  lookAt: Ut,
  getBox: Ae,
  describeMesh: Ne,
  getPlane: Nt,
  getBoxInstance: Ie,
  getSphere: Mt,
  getCylinder: Rt,
  getTorusKnot: _t,
  getLine: At,
  walkMeshes: Q,
  pickMesh: bt,
  getMesh: P,
  getMeshAsync: q,
  calcTopOfMeshWorldPosition: Tt,
  mergeMeshes: Le,
  getVoxModel: Ot,
  calcClientRectForMesh: Et,
  updateArcRotateCameraPosition: Ce,
  findClosestPick: vt,
  destroyMesh: Pt,
  getMeshInstance: Bt,
  getMeshInstanceAsync: Lt,
  isInstancedMesh: Ht,
  pickMeshes: Dt,
  getPolyhedron: St,
  updateMesh: R
}, $t = (e = V()) => {
  const r = new H(e), t = e.getRenderingCanvas();
  Pe.getArcRotateCamera(r, "Camera", {}).attachControl(t, !0), ve.getHemisphericLight(r, "light1", {
    direction: [1, 1, 1]
  }), _e.getSphere(r, "sphere", {
    radius: 0.5
  });
  const a = { debug: !1 };
  return t.onkeyup = (o) => {
    o.ctrlKey && o.keyCode === 73 && (a.debug = !a.debug, a.debug ? r.debugLayer.hide() : (console.log("SHOW!"), r.debugLayer.show()));
  }, e.runRenderLoop(() => {
    r.render();
  }), r;
}, Yr = {
  createEngine: V,
  createCanvas: Ee,
  v3: y,
  c3: S,
  c4: z,
  helloWorld: $t,
  attachEditorControls: Se
}, Ft = async ({
  canvas: e,
  ...r
}) => {
  const t = new Me(e, {
    // powerPreference: "high-performance",
    ...r
  });
  return t.hideLoadingUI(), await t.initAsync(), t;
}, Gt = () => Me.IsSupportedAsync, Xr = {
  createWebGlEngine: V,
  createWebGpuEngine: Ft,
  isWebGpuCapable: Gt
}, Vt = (e) => (r) => {
};
async function zt(e, r = e.name) {
  return await e();
}
const ie = (e) => {
  const r = Vt();
  return new Promise((t, n) => {
    try {
      e.onAfterRenderCameraObservable.addOnce(() => {
        r(), t();
      }), e.render(!0);
    } catch (a) {
      n(a);
    }
  });
}, Wt = (e) => {
  console.log("fixing eyelashes", e.meshes), e.meshes.forEach((r) => {
    if (r.name.includes("Eyelashes") && (console.log("fixing eyelashes", r.name), r.name.includes("primitive1"))) {
      console.log("fixing eyelashes: primitive1", r.name);
      const t = r.material;
      if (!t)
        throw new Error("Mesh has no material", { cause: r });
      const n = t.getActiveTextures()[0];
      n.hasAlpha = !0, n.getAlphaFromRGB = !0, t.transparencyMode = 1, t.opacityTexture = n, r.visibility = 0.5, t.albedoColor = new me(0, 0, 0);
    }
  });
}, Zt = [
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
], Yt = [
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
], ke = (e) => {
  const r = e?.material?.getActiveTextures() ?? [];
  if (x(
    r.find((t) => {
      const n = t?.name;
      return x(Zt.find((a) => n.includes(a)));
    })
  ) && (e.visibility = 0), x(
    r.find((t) => {
      const n = t?.name;
      return x(Yt.find((a) => n.includes(a)));
    })
  )) {
    const t = e.material;
    t.metallic = 1, t.transparencyMode = 2, t.albedoTexture && (t.albedoTexture.hasAlpha = !0), t.clearCoat.isEnabled = !0, t.clearCoat.intensity = 0.2, t.subSurface.isTranslucencyEnabled = !0, t.subSurface.translucencyIntensity = 0.5, t.subSurface.translucencyIntensityTexture = t.albedoTexture, t.opacityTexture = t.albedoTexture;
  }
  if (e.name === "Genesis8Female.Shape_primitive10") {
    const t = e.material;
    t.metallic = 0, e.visibility = 0;
  }
  if (e.name === "Genesis8Female.Shape_primitive12") {
    const t = e.material;
    t.roughness = 0, t.clearCoat.isEnabled = !0, t.clearCoat.intensity = 0.5, t.subSurface.isTranslucencyEnabled = !0, t.subSurface.translucencyIntensity = 0.5, t.subSurface.translucencyIntensityTexture = t.albedoTexture, e.visibility = 0, e.setEnabled(!1);
  }
  if (e.name === "Genesis8Female.Shape_primitive13") {
    const t = e.material;
    t.metallic = 0;
  }
  if (e.name === "Genesis8Female.Shape_primitive14") {
    const t = e.material;
    t.opacityTexture = null, t.metallic = 0, t.useAlphaFromAlbedoTexture = !1, t.albedoTexture && (t.albedoTexture.level = 3);
  }
  if (e.name.endsWith("Eyelashes.Shape_primitive0")) {
    const t = e.material;
    t.roughness = 0.5, t.clearCoat.isEnabled = !0, t.clearCoat.intensity = 0.5, t.subSurface.isTranslucencyEnabled = !0, t.subSurface.translucencyIntensity = 0.5, t.subSurface.translucencyIntensityTexture = t.albedoTexture, e.visibility = 0.2;
  }
  e.getChildMeshes().map(ke);
}, Xt = (e) => {
  console.log("fixing bump maps", e.meshes), e.meshes.forEach((r) => {
    const t = r.material;
    t && (t.bumpTexture = null);
  });
}, Kt = (e) => {
  Wt(e), e.meshes.map(ke), Xt(e);
}, Jt = (e) => {
  const { path: r, scene: t, name: n = r instanceof File ? r.name : r } = e;
  return t.getEngine().hideLoadingUI(), new Promise((o, s) => {
    try {
      ue.ShowLoadingScreen = !1, ue.Append(
        "",
        r,
        t,
        (i) => {
          const l = i.getMeshByName("__root__");
          if (!l)
            throw new Error("No root mesh found", { cause: i });
          l.name = n, i.cameras.length > 0 && (i.activeCamera = i.cameras[0]), i.animationGroups.forEach((c) => {
            c.stop();
          }), Kt(i), o(l);
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
}, Kr = {
  renderOnce: ie,
  loadDazFigure: Jt
  // fixDazFigure,
  // loadAssetContainer,
  // builder,
}, Oe = (e, r = e.width, t = e.height) => {
  const n = document.createElement("canvas");
  return n.width = r, n.height = t, n.getContext("2d").drawImage(
    e,
    0,
    0,
    e.width,
    e.height,
    0,
    0,
    n.width,
    n.height
  ), n;
}, Qt = async (e) => {
  if (typeof e == "string")
    return e;
  const r = document.createElement("canvas");
  return r.width = e.width, r.height = e.height, r.getContext("2d").drawImage(e, 0, 0), await dt.toSrcString(r);
}, He = async (e, r, t) => {
  if (t instanceof HTMLCanvasElement)
    return new Promise((a, o) => {
      try {
        const s = new re(r, t, e);
        s.update(), s.hasAlpha = !0, a(s);
      } catch (s) {
        o(s);
      }
    });
  const n = await Qt(t);
  return new Promise((a, o) => {
    try {
      const s = new L(n, e, !1, !0);
      s.name = r, s.hasAlpha = !0, s.onLoadObservable.addOnce(() => {
        a(s);
      });
    } catch (s) {
      o(s);
    }
  });
}, qt = async (e, r) => {
  const t = Te.randomUuid(), { size: n, image: a, color: o } = e, s = v.CreatePlane(
    `plane-${t}`,
    {
      width: n,
      height: n
    },
    r
  ), i = new U(`material-${t}`, r);
  if (x(a)) {
    const l = await He(r, `layer-${t}`, a);
    e._texture = l, e._mesh = s, e._material = i, l.hasAlpha = !0, i.opacityTexture = l, i.emissiveTexture = l;
  }
  return x(o) && (i.emissiveColor = S(o)), s.material = i, s;
}, jt = async (e, r) => {
  const t = new H(r);
  return await Promise.all(
    e.map(async (n, a) => {
      const o = await qt(n, t);
      return o.position.set(0, 0, -a), o;
    })
  ), t;
}, er = ({ size: e } = { size: 4096 }) => {
  const r = V({ width: e, height: e }), t = r.getRenderingCanvas(), n = {
    layers: []
  }, a = {
    addLayer: (o) => (n.layers.push({ size: e, ...o }), a),
    render: async () => zt(async () => {
      const o = await jt(n.layers, r), s = new j("camera1", y(0, 0, -1e3), o);
      if (s.setTarget(y()), s.rotation = y(0, 0, Math.PI), s.mode = O.ORTHOGRAPHIC_CAMERA, s.minZ = 0, s.maxZ = 1e5, await ie(o), a.clear(), !t)
        throw new Error("No canvas found", { cause: r });
      return Oe(t);
    }, "Texture render"),
    clear: () => (n.layers.forEach((o) => {
      o?._cached || (o?._texture?.dispose(), o?._mesh?.dispose(), o?._material?.dispose());
    }), n.layers.length = 0, a)
  };
  return a;
}, ce = (e, r) => {
  const t = e.getSize(), n = e.getContext();
  r(n, t), e.update();
}, tr = (e) => {
  ce(e, (r, t) => {
    const { width: n, height: a } = t;
    r.clearRect(0, 0, n, a);
  });
}, rr = (e, r = "DEBUG IMAGE") => {
  const t = $e.copyToCanvas(e, 1024, 1024);
  t.style.border = "1px solid grey";
  const n = document.createElement("div");
  return n.textContent = r, document.body.appendChild(n), document.body.appendChild(t), new Promise((a, o) => {
    const s = () => {
      t.remove(), n.remove(), a(void 0);
    };
    t.onclick = s, n.onclick = s;
  });
}, nr = (e, r) => {
  const t = e.getTextureByName(r);
  t && (t.dispose(), e.removeTexture(t));
}, ar = (e, r = {}) => {
  const { color: t = "black" } = r;
  ce(e, (n, a) => {
    const { width: o, height: s } = a;
    n.fillStyle = E.from(t).toString(), n.fillRect(0, 0, o, s);
  });
}, or = (e, r, t = {}) => {
  const {
    backgroundColor: n,
    outline: a = !0,
    color: o = "black",
    fontFamily: s = "monospace",
    fontStyle: i = "bold",
    outlineColor: l = E.builder({ color: "white" }).alpha(0.1).toString(),
    textureSize: c = Math.min(e.getSize().width, e.getSize().height)
  } = t;
  e.hasAlpha = !0;
  let p = c, g = `${i} ${p}px ${s}`;
  const d = e.getContext();
  d.font = g;
  let f = d.measureText(r);
  p = c / f.width * c, g = `${i} ${p}px ${s}`, d.font = g;
  const u = 0;
  f = d.measureText(r);
  const h = f.fontBoundingBoxAscent ?? 0, m = c - (c - h) / 2;
  d.lineWidth = p / 2;
  const M = {
    x: 0,
    y: m - p,
    width: c,
    height: h * 2
  };
  if (x(n)) {
    d.fillStyle = E.from(n).toString();
    const { x: T, y: I, width: Y, height: le } = M;
    d.fillRect(T, I, Y, le);
  }
  return a && (d.strokeStyle = l, d.strokeText(r, u, m)), d.fillStyle = o, d.fillText(r, u, m), e.hasAlpha = !0, e.update(), M;
}, Ue = {
  linearNearest: L.LINEAR_NEAREST,
  nearestNearest: L.NEAREST_NEAREST,
  linearLinear: L.LINEAR_LINEAR,
  nearestLinear: L.NEAREST_LINEAR
}, W = (e, r, t) => {
  const n = e.getTextureByName(r);
  return x(n) ? n : t();
}, Z = (e, r) => {
  const { hasAlpha: t } = r;
  w(t, (n) => {
    e.hasAlpha = n;
  }), e instanceof re && e.update();
}, sr = (e, r, t = {}) => {
  const n = W(e, r, () => {
    const {
      generateMipMaps: a = !0,
      samplingMode: o = "linearNearest",
      width: s = 1024,
      height: i = 1024,
      init: l
    } = t, c = new re(
      r,
      {
        width: s,
        height: i
      },
      e,
      a,
      Ue[o]
    );
    return l && (l(c.getContext()), c.update()), c;
  });
  return Z(n, t), n;
}, De = (e) => Ue[e], ir = (e, r, t) => W(e, r, () => {
  const {
    element: n,
    generateMipMaps: a = !0,
    samplingMode: o = "linearNearest"
  } = t;
  if (!n)
    throw new Error("HTML element is required to create texture", {
      cause: t
    });
  const s = new qe(r, n, {
    generateMipMaps: a,
    samplingMode: De(o),
    engine: e.getEngine(),
    scene: e
  });
  return Z(s, t), s;
}), cr = (e, r, t) => {
  const n = W(e, r, () => {
    const {
      src: a,
      generateMipMaps: o = !0,
      samplingMode: s = "linearNearest"
    } = t;
    if (!a)
      throw new Error("src is required", { cause: t });
    const i = new L(a, e, {
      samplingMode: De(s)
    });
    return i.name = r, i;
  });
  return Z(n, t), n;
}, $e = {
  builder: er,
  copyToCanvas: Oe,
  debugImage: rr,
  getTexture: W,
  getHtmlElementTexture: ir,
  getDynamicTexture: sr,
  getPathTexture: cr,
  updateTexture: Z,
  imageToTexture: He,
  drawTextOnTexture: or,
  drawOnTexture: ce,
  drawBackgroundOnTexture: ar,
  clearTexture: tr,
  destroyTexture: nr
}, lr = (e, r, t) => {
  const n = e?.effectLayers?.length ? e.getGlowLayerByName(r) : void 0;
  return x(n) ? n : new be(r, e, t);
}, ur = (e, r, t) => {
  const n = e.getHighlightLayerByName(r);
  return x(n) ? n : new je(r, e, t);
}, Jr = {
  getGlowLayer: lr,
  getHighlightLayer: ur
}, Fe = {
  getMaterial: D,
  updateMaterial: J,
  updateStandardMaterial: Re
}, dr = (e, r) => {
  const t = e.getTransformNodeByName(r);
  return x(t) ? t : new et(r, e);
}, Qr = {
  getTransformNode: dr
}, hr = (e) => {
  const r = e.metadata ?? {}, t = r.solidParticleSystems ?? {};
  return x(t) || (e.metadata = {
    ...r,
    solidParticleSystems: {}
  }), t;
}, Ge = (e, r, t) => {
  const n = hr(e), a = n[r];
  x(a);
  const o = t();
  return n[r] = o, o;
}, gr = (e, r, t) => Ge(e, r, () => new te(r, e, {
  ...t
})), fr = (e, r, t = {}) => {
  const n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), { material: l, onMeshBuild: c, ...p } = t;
  let g;
  const d = () => {
    g?.mesh?.dispose(!1), g = new te(r, e, {
      ...p
    });
  };
  d();
  const f = {
    scene: e,
    clearParticles: () => {
      g.particles.forEach((u, h) => {
        u.color = fe;
      }), g.setParticles(), g.particles.forEach((u, h) => {
        u.alive = !1;
      });
    },
    getSystem: () => g,
    getNames: () => s.keys(),
    hasMesh: (u) => s.has(u),
    getInstance: () => g,
    updateNextParticle: (u, h) => {
      const m = _.assertValue(
        s.get(u)
      ), M = _.assertValue(n.get(u)), T = m[M];
      f.updateParticleByIndex(T, h), n.set(u, M + 1);
    },
    updateParticleByIndex: (u, h) => {
      const m = g.particles[u];
      _.assertValue(m, `particle not found for ${u}`), m.alive = !0, h(m, u);
    },
    updateParticlesByName: (u, h) => {
      const m = s.get(u);
      m && m.forEach((M) => {
        f.updateParticleByIndex(M, h);
      });
    },
    removeMesh: (u) => {
      a.delete(u), o.delete(u), s.delete(u.name), i.delete(u.name), f.rebuild();
    },
    addMesh: (u, h = 1) => {
      if (a.has(u))
        throw new Error(
          `Mesh ${u.name} already exists in the Sps. Use removeMesh to remove it first.`
        );
      n.set(u.name, 0), a.set(u, h), i.set(u.name, u), f.rebuild(), f.clearParticles(), u.setEnabled(!1);
    },
    rebuild: () => {
      d(), o.clear();
      try {
        a.forEach((h, m) => {
          g.addShape(m, h);
          for (let M = 0; M < h; M++) {
            const T = g.particles.length - 1 - M;
            o.set(m, [
              ...o.get(m) || [],
              T
            ]), s.set(m.name, [
              ...o.get(m) || [],
              T
            ]);
          }
        });
        const u = g.buildMesh();
        l && (u.material = Fe.getMaterial(e, l)), c?.(u);
      } catch (u) {
        console.error(u);
      }
    },
    syncParticlestoMeshes: () => {
      o.forEach((u, h) => {
        for (let m = 0; m < u.length; m++) {
          const M = u[m], T = _.assertValue(g.particles[M]);
          if (T.position.copyFrom(h.position), T.rotation.copyFrom(h.rotation), T.scaling.copyFrom(h.scaling), h.material instanceof U) {
            const I = h.material.diffuseColor;
            T.color = new G(I.r, I.g, I.b, h.material.alpha);
          }
        }
      });
    },
    dispose: () => {
      a.clear(), o.clear(), s.clear(), i.clear(), n.clear(), g?.mesh?.dispose(), g.dispose();
    },
    update: () => {
      g.setParticles(), n.forEach((u, h) => {
        n.set(h, 0);
      }), g.particles.forEach((u) => {
        u.alive = !1, u.color = fe;
      });
    }
  };
  return f;
}, fe = new G(0, 0, 0, 0), pr = {
  getSolidParticleSystem: gr,
  getParticleSystem: Ge,
  Sps: fr
}, mr = (e, r, t) => new tt(y(e), y(r), t), yr = (e, r, t = {}) => {
  const {
    trianglePredicate: n,
    fastCheck: a,
    predicate: o = (s) => s.isPickable
  } = t;
  return e.pickWithRay(r, o, a, n);
}, qr = {
  createRay: mr,
  pickWithRay: yr
}, xr = (e) => new H(e), wr = (e) => {
  e.debugLayer.isVisible() ? e.debugLayer.hide() : e.debugLayer.show();
}, jr = {
  createScene: xr,
  toggleInspector: wr,
  renderOnce: ie
}, Mr = (e) => {
  const r = e.getScene();
  e.dispose(), r.getLightsByTags("shadowCaster").forEach((n) => {
    n.metadata.shadowGenerator.removeShadowCaster(e);
  });
}, br = (e) => (e.getScene().getLightsByTags("shadowCaster").forEach((n) => {
  n.metadata.shadowGenerator.addShadowCaster(e);
}), () => {
  Mr(e);
}), en = {
  addShadowToMesh: br
}, Tr = (e, r, t = {}) => {
  const n = new be(r, e, t);
  return n.neutralColor = new G(0, 0, 0, 0), n;
}, tn = {
  addGlowLayer: Tr,
  Constants: rt
};
async function Cr({
  baseUrl: e,
  imageNames: r,
  atlasSize: t,
  padding: n = 0
}) {
  const a = document.createElement("canvas");
  a.width = t, a.height = t;
  const o = a.getContext("2d"), s = {}, i = [];
  let l = 0, c = 0, p = 0;
  for (const d of r) {
    const f = d.endsWith(".png") ? d : `${d}.png`, u = await Sr(`${e}/${f}`), h = u.width + n * 2, m = u.height + n * 2;
    if (l + h > t && (l = 0, c += p, p = 0), c + m > t)
      throw new Error(`Not enough space in atlas for image: ${f}`);
    o.drawImage(u, l + n, c + n), s[f] = {
      frame: {
        x: l + n,
        y: c + n,
        w: u.width,
        h: u.height
      }
    }, i.push({
      filename: f,
      frame: {
        x: l + n,
        y: c + n,
        w: u.width,
        h: u.height
      },
      rotated: !1,
      trimmed: !1,
      spriteSourceSize: { x: 0, y: 0, w: u.width, h: u.height },
      sourceSize: { w: u.width, h: u.height }
    }), l += h, p = Math.max(p, m);
  }
  const g = await new Promise(
    (d) => a.toBlob((f) => d(f), "image/png")
  );
  return {
    canvas: a,
    atlasBlob: g,
    spritePackageManagerJson: { frames: s },
    babylonSpriteMapJson: { frames: i }
  };
}
async function Sr(e) {
  return new Promise((r, t) => {
    const n = new Image();
    n.src = e, n.onload = () => r(n), n.onerror = (a) => t(new Error(`Failed to load image: ${e}`));
  });
}
const Er = (e, r, t = {}) => {
  const n = e?.spriteManagers?.find((d) => d.name === r);
  if (x(n))
    return n;
  const {
    capacity: a = 1,
    atlasUrl: o,
    atlasBlob: s,
    epsilon: i,
    samplingMode: l,
    spriteJSON: c,
    options: p
  } = t;
  let g;
  try {
    s && (g = URL.createObjectURL(s));
    const d = x(o) ? o : g;
    if (N(d))
      throw new Error("altasUrl or atlasBlob is required", { cause: t });
    return new nt(
      r,
      d,
      a,
      e,
      c,
      i,
      l,
      p
    );
  } finally {
    g && URL.revokeObjectURL(g);
  }
}, Ve = (e, r, t = {}) => {
  const n = e?.spriteManagers?.find((u) => u.name === r);
  if (x(n))
    return n;
  const {
    capacity: a = 1,
    cellSize: o = 64,
    atlasUrl: s,
    atlasBlob: i,
    epsilon: l,
    samplingMode: c,
    fromPacked: p,
    spriteJSON: g,
    options: d
  } = t;
  let f;
  try {
    i && (f = URL.createObjectURL(i));
    const u = x(s) ? s : f;
    if (N(u))
      throw new Error("altasUrl or atlasBlob is required", { cause: t });
    return new at(
      r,
      u,
      a,
      o,
      e,
      l,
      c,
      p,
      g,
      d
    );
  } finally {
    f && URL.revokeObjectURL(f);
  }
}, Pr = (e, r, t) => {
  const n = ut(Ve(e, t)), a = n?.sprites?.find((o) => o.name === r);
  return x(a) ? a : new ot(r, n);
}, rn = {
  getSpriteManager: Ve,
  getSprite: Pr,
  createTextureAtlas: Cr,
  getSpritePackedManager: Er
}, vr = (e, r = {}) => {
  const {
    random: t = Te.globalRandom,
    radius: n = 1,
    maxBounce: a = 0,
    groundZ: o = 0,
    speed: s = 20,
    decay: i = 0.01,
    dispose: l = () => e.isVisible = !1
  } = r;
  {
    const c = e.props?.path;
    if (x(c) && c.length > 0) {
      const p = c.pop();
      if (!p)
        throw new Error("No next value from path", { cause: c });
      e.position = p;
      return;
    }
  }
  {
    const { bounces: c = a } = e.props ?? {};
    if (c <= 0) {
      t() < i && l();
      return;
    }
    const p = c / a, g = e.position, [d, f, u] = k(g), h = (Ye) => (t() * n * 2 - n) * (p / 4) + Ye, [m, M] = [h(d), h(f)], T = y([m, M, o]), [I, Y, le] = k(F.midPoint3(g, T)), ze = y(I, Y, u - t() * p * 3), We = {
      path: st.CreateCatmullRomSpline([g, ze, T], s).getPoints().reverse(),
      bounces: c - 1
      // rotationAxis: [2 * random() - 1, 2 * random() - 1, 2 * random() - 1],
    }, Ze = e.props ?? {};
    e.props = { ...Ze, ...We };
  }
};
class B {
  /**
   * Evaluate a query
   * @param query defines the query to evaluate
   * @param evaluateCallback defines the callback used to filter result
   * @returns true if the query matches
   */
  static Eval(r, t) {
    return r.match(/\([^()]*\)/g) ? r = r.replace(/\([^()]*\)/g, (n) => (n = n.slice(1, n.length - 1), B._HandleParenthesisContent(n, t))) : r = B._HandleParenthesisContent(r, t), r === "true" ? !0 : r === "false" ? !1 : B.Eval(r, t);
  }
  static _HandleParenthesisContent(r, t) {
    t = t || ((o) => o === "true");
    let n;
    const a = r.split("||");
    for (const o in a)
      if (Object.prototype.hasOwnProperty.call(a, o)) {
        let s = B._SimplifyNegation(a[o].trim());
        const i = s.split("&&");
        if (i.length > 1)
          for (let l = 0; l < i.length; ++l) {
            const c = B._SimplifyNegation(i[l].trim());
            if (c !== "true" && c !== "false" ? c[0] === "!" ? n = !t(c.substring(1)) : n = t(c) : n = c === "true", !n) {
              s = "false";
              break;
            }
          }
        if (n || s === "true") {
          n = !0;
          break;
        }
        s !== "true" && s !== "false" ? s[0] === "!" ? n = !t(s.substring(1)) : n = t(s) : n = s === "true";
      }
    return n ? "true" : "false";
  }
  static _SimplifyNegation(r) {
    return r = r.replace(/^[\s!]+/, (t) => (t = t.replace(/[\s]/g, () => ""), t.length % 2 ? "!" : "")), r = r.trim(), r === "!true" ? r = "false" : r === "!false" && (r = "true"), r;
  }
}
class C {
  /**
   * Adds support for tags on the given object
   * @param obj defines the object to use
   */
  static EnableFor(r) {
    r._tags = r._tags || {}, r.hasTags = () => C.HasTags(r), r.addTags = (t) => C.AddTagsTo(r, t), r.removeTags = (t) => C.RemoveTagsFrom(r, t), r.matchesTagsQuery = (t) => C.MatchesQuery(r, t);
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
    const t = r._tags;
    for (const n in t)
      if (Object.prototype.hasOwnProperty.call(t, n))
        return !0;
    return !1;
  }
  /**
   * Gets the tags available on a given object
   * @param obj defines the object to use
   * @param asString defines if the tags must be returned as a string instead of an array of strings
   * @returns the tags
   */
  static GetTags(r, t = !0) {
    if (!r._tags)
      return null;
    if (t) {
      const n = [];
      for (const a in r._tags)
        Object.prototype.hasOwnProperty.call(r._tags, a) && r._tags[a] === !0 && n.push(a);
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
  static AddTagsTo(r, t) {
    if (!t || typeof t != "string")
      return;
    const n = t.split(" ");
    for (const a of n)
      C._AddTagTo(r, a);
  }
  /**
   * @internal
   */
  static _AddTagTo(r, t) {
    t = t.trim(), !(t === "" || t === "true" || t === "false") && (t.match(/[\s]/) || t.match(/^([!]|([|]|[&]){2})/) || (C.EnableFor(r), r._tags[t] = !0));
  }
  /**
   * Removes specific tags from a specific object
   * @param obj defines the object to use
   * @param tagsString defines the tags to remove
   */
  static RemoveTagsFrom(r, t) {
    if (!C.HasTags(r))
      return;
    const n = t.split(" ");
    for (const a in n)
      C._RemoveTagFrom(r, n[a]);
  }
  /**
   * @internal
   */
  static _RemoveTagFrom(r, t) {
    delete r._tags[t];
  }
  /**
   * Defines if tags hosted on an object match a given query
   * @param obj defines the object to use
   * @param tagsQuery defines the tag query
   * @returns a boolean
   */
  static MatchesQuery(r, t) {
    return t === void 0 ? !0 : t === "" ? C.HasTags(r) : B.Eval(t, (n) => C.HasTags(r) && r._tags[n]);
  }
}
const Rr = (e, r, t) => {
  const { XYZI: n, RGBA: a } = r, o = a.map((i) => {
    const { r: l, g: c, b: p, a: g } = i;
    return E.builder({ color: [l, c, p, g], model: "rgba" }).toString();
  }), s = new A(t, e);
  return n.map((i, l) => {
    const c = o[i.i], p = Ie(e, `voxel-${c}`, {
      color: c,
      material: `voxel-material-${c}`
    });
    return p.position = y(i), p.parent = s, p;
  }), C.AddTagsTo(s, "complex"), s;
}, Ar = (e) => {
  const r = Object.entries(e).sort((t, n) => {
    const [a] = t, [o] = n;
    return a.localeCompare(o);
  });
  return JSON.stringify(r);
}, Ir = (e) => {
  const r = {};
  return e.forEach((t) => {
    const n = t?.material?.name;
    if (!n)
      throw new Error("Mesh material is missing name", { cause: t });
    const a = r[n] ?? [];
    a.push(t), r[n] = a;
  }), r;
}, Br = (e, r, t) => {
  const { XYZI: n, RGBA: a } = r, o = a.map((d) => {
    const { r: f, g: u, b: h, a: m } = d;
    return E.builder({ color: [f, u, h, m], model: "rgba" }).toString();
  }), s = n.map((d, f) => {
    const u = o[d.i], [h, m, M] = k(d), T = Ae(
      e,
      `voxel-merged-${u}-${Ar(d)}`,
      {
        position: [h, m, M],
        // color,
        // material: `voxel-merged-material-${color}`,
        material: "voxel-material",
        colors: lt.from(6).map(() => u)
      }
    );
    return T.setEnabled(!1), T;
  }), i = Ir(s), l = Object.values(i).map((d) => Le(d)), c = new A(`merged-${t}`, e);
  l.filter(x).forEach((d) => d.parent = c);
  const p = D(e, "voxel-material", "standard");
  l.filter(x).forEach((d) => d.material = p), c.metadata = {
    voxels: s
  }, C.AddTagsTo(c, "merged");
  const g = new A(t, e);
  return g.metadata = {
    voxels: s
  }, c.parent = g, g;
}, nn = {
  animateExplosion: vr,
  voxDataToSps: Be,
  voxDataToMergedModel: Br,
  voxDataToComplexModel: Rr
}, Lr = ({
  engine: e,
  canvas: r
}) => {
  const t = new b.Scene(e);
  console.log(t), new b.ArcRotateCamera(
    "ArcRotateCamera",
    -Math.PI / 2,
    Math.PI / 2.2,
    50,
    new b.Vector3(0, 0, 0),
    t
  ).attachControl(r, !0), new b.HemisphericLight(
    "light",
    new b.Vector3(0, 1, -1),
    t
  );
  const a = new b.StandardMaterial("mat");
  a.diffuseTexture = new b.Texture("textures/earth.jpg");
  const o = new b.StandardMaterial("mat"), s = new b.Texture("textures/fire.jpg");
  o.diffuseTexture = s;
  const i = new b.SolidParticleSystem("SPS", t, {
    useModelMaterial: !0
  }), l = b.MeshBuilder.CreateBox("FOO");
  return l.material = a, i.addShape(l, 1e4), i.buildMesh(), i.initParticles = () => {
    for (let p = 0; p < i.nbParticles; p++) {
      const g = i.particles[p];
      g.position.x = b.Scalar.RandomRange(-20, 20), g.position.y = b.Scalar.RandomRange(-20, 20), g.position.z = b.Scalar.RandomRange(-20, 20);
    }
  }, i.initParticles(), i.setParticles(), { scene: t, update: () => {
    const p = Math.sin(Date.now() * 5e-3);
    i.particles.forEach((g, d) => {
      d > 20 ? (g.rotation.x = p, a.alpha = p, a.diffuseTexture = s) : g.rotation.y = p;
    }), i.setParticles();
  } };
}, Nr = ({
  engine: e,
  canvas: r
}) => {
  const t = new b.Scene(e);
  console.log(t), Pe.getArcRotateCamera(t, "ArcRotateCamera", {
    alpha: -Math.PI / 2,
    beta: Math.PI / 2.2,
    radius: 50,
    target: [0, 0, 0]
  }).attachControl(r, !0), ve.getHemisphericLight(t, "light", {
    direction: [0, 1, -1]
  });
  const a = $e.getPathTexture(t, "tex", {
    src: "/images/test.jpg"
  }), o = Fe.getMaterial(t, "mat", {
    opacityTexture: a.name
    // diffuseColor: Colors.from("red").alpha(0.99).toString(),
    // alpha: 0.99,
  }), s = _e.getBox(
    t,
    "box1"
    //  { material: mat.name }
  ), i = pr.Sps(t, "sps", {
    material: o.name,
    updatable: !0,
    // enableDepthSort: true,
    onMeshBuild: (c) => {
      c.useVertexColors = !0, c.hasVertexAlpha = !0;
    }
  });
  return i.addMesh(s, 1e4), i.updateParticlesByName("box1", (c, p) => {
    c.position.x = b.Scalar.RandomRange(-20, 20), c.position.y = b.Scalar.RandomRange(-20, 20), c.position.z = b.Scalar.RandomRange(-20, 20);
  }), { scene: t, update: () => {
    const c = Math.sin(Date.now() * 5e-3), p = ht.noiseStream(0);
    i.updateParticlesByName("box1", (g, d) => {
      g.color = new b.Color4(p(), p(), p(), 0.5), Math.random() > 0.5 ? g.rotation.x = p() * c : g.rotation.y = p() * c;
    }), i.update();
  } };
}, an = {
  spsDebug: Lr,
  spsDebug2: Nr
};
export {
  Yr as Babs,
  ge as CAMERA_MODES,
  Pe as Cameras,
  an as Debugs,
  Xr as Engines,
  Jr as Layers,
  ve as Lights,
  Fe as Materials,
  _e as Meshes,
  Kr as Models,
  Qr as Nodes,
  pr as Particles,
  qr as Rays,
  jr as Scenes,
  en as Shadows,
  tn as Specials,
  rn as Sprites,
  $e as Textures,
  nn as Voxels,
  Tr as addGlowLayer
};
//# sourceMappingURL=index.js.map
