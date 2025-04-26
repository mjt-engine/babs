import { Inputs as G } from "@mjt-engine/input";
import { toVec3 as L, Maths as H, toVec2 as ut } from "@mjt-engine/math";
import { Vector3 as W, Engine as $t, Color3 as dt, Color4 as ht, Matrix as ft, Scene as _, UniversalCamera as K, Camera as B, TargetCamera as Ot, ArcRotateCamera as J, HemisphericLight as gt, PointLight as mt, StandardMaterial as D, PBRMaterial as Ft, Mesh as I, MeshBuilder as S, SolidParticleSystem as pt, InstancedMesh as zt, Texture as R, WebGPUEngine as yt, SceneLoader as st, DynamicTexture as Q, HtmlElementTexture as Ut, GlowLayer as xt, HighlightLayer as Vt, TransformNode as Wt, Ray as Zt, Constants as Xt, SpriteManager as Yt, Sprite as Kt, Curve3 as Jt } from "@babylonjs/core";
import { Colors as C } from "@mjt-engine/color";
import { isUndefined as N, isDefined as y, iff as p, tuple2 as Qt, tuple3 as qt, Arrays as jt } from "@mjt-engine/object";
import { extent as at } from "d3-array";
import { Asserts as wt, assertValue as te } from "@mjt-engine/assert";
import { Randoms as Mt } from "@mjt-engine/random";
import { Images as ee } from "@mjt-engine/image";
import "@babylonjs/inspector";
function g(t = 0, r = 0, e = 0) {
  if (typeof t == "number")
    return new W(t, r, e);
  const [n = 0, o = 0, s = 0] = L(t);
  return new W(n, o, s);
}
const Tt = (t, r) => {
  const e = t.alpha, n = t.beta, o = t.radius;
  t.target = t.target.add(g(r)), t.radius = o, t.alpha = e, t.beta = n;
}, bt = (t, r = {}) => {
  const {
    keySensitivity: e = 0.5,
    mouseSensitivity: n = 0.05,
    parent: o = document.body,
    action: s = () => {
    }
  } = r, a = t.alpha, i = t.beta, l = t.radius;
  g(t.target);
  const c = (d = 0, x = 0, h = 0) => {
    Tt(t, [d, x, h]), s();
  }, f = G.listenToKey(
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
        t.beta = t.beta + e / 8, s();
      },
      z: () => {
        t.beta = t.beta - e / 8, s();
      },
      c: () => {
        t.alpha = a, t.beta = i, t.radius = l, s();
      },
      "shift+d": () => {
        t.alpha = t.alpha + e / 8, s();
      },
      "shift+a": () => {
        t.alpha = t.alpha - e / 8, s();
      }
    },
    {
      autoUp: !1,
      parent: o
    }
  ), m = {
    lastPosition: void 0
  };
  o.addEventListener("pointerdown", (d) => {
    d.buttons === 4 && (m.lastPosition = d);
  }), o.addEventListener("pointermove", (d) => {
    if (d.buttons !== 4)
      return;
    const { lastPosition: x = d } = m;
    m.lastPosition = d;
    const h = H.subtract2(x, d), [w, b] = ut(h);
    if (d.buttons === 4 && d.shiftKey) {
      t.beta = t.beta + b * n;
      return;
    }
    d.buttons === 4 && (c(b * n, -b * n, 0), c(w * n, w * n, 0));
  });
  const u = G.listenToMouse(
    {
      wheel: (d) => {
        if (d instanceof WheelEvent) {
          const x = d.deltaY * n;
          t.radius += x, s();
        }
      }
    },
    {
      parent: o
    }
  );
  return [f, u];
}, Ct = ({
  width: t = 320,
  height: r = 320
}) => {
  const e = document.createElement("canvas");
  return e.width = t, e.height = r, e;
}, $ = (t) => {
  const r = t instanceof HTMLCanvasElement || t instanceof OffscreenCanvas ? {} : t ?? {}, e = t instanceof HTMLCanvasElement || t instanceof OffscreenCanvas ? t : Ct({
    width: t?.width ?? 320,
    height: t?.height ?? 320
  }), { antialias: n } = r, o = new $t(e, n, {
    powerPreference: "high-performance",
    ...r
  });
  return o.hideLoadingUI(), o;
}, T = (t) => {
  const r = C.builder({ color: t }).hex();
  return dt.FromHexString(r);
}, O = (t) => {
  const r = C.builder({ color: t }), e = ht.FromHexString(r.hex());
  return e.a = r.alpha(), e;
}, it = (t, r, e, n = {}) => {
  const { camera: o = t.activeCamera, predicate: s = () => !0 } = n, a = t.createPickingRay(r, e, ft.Identity(), o);
  return t.pickWithRay(a, s)?.pickedMesh;
}, Z = (t, r) => {
  if (t instanceof _)
    return t.meshes.forEach((e) => Z(e, r));
  r(t), t.getChildMeshes().forEach((e) => Z(e, r));
}, re = (t, r = {}) => {
  const {
    keySensitivity: e = 0.05,
    mouseSensitivity: n = 0.05,
    parent: o = document.body
  } = r;
  G.listenToKey(
    {
      w: () => {
        t.position.addInPlace(g(0, 0, -e));
      },
      a: () => {
        t.rotation.y -= e / 2;
      },
      s: () => {
        t.position.addInPlace(g(0, 0, e));
      },
      d: () => {
        t.rotation.y += e / 2;
      },
      i: () => {
        t.position.addInPlace(g(0, e, 0));
      },
      j: () => {
        t.position.addInPlace(g(e, 0, 0));
      },
      k: () => {
        t.position.addInPlace(g(0, -e, 0));
      },
      l: () => {
        t.position.addInPlace(g(-e, 0, 0));
      }
    },
    {
      propagate: !1,
      parent: o
    }
  ), G.listenToMouse(
    {
      wheel: (s) => {
        if (s instanceof WheelEvent) {
          if (s.shiftKey) {
            const i = s.deltaX * n;
            t.position.addInPlace(g(0, -i, 0));
            return;
          }
          const a = s.deltaY * n;
          t.position.addInPlace(g(0, 0, a));
        }
      },
      click: (s) => {
        if (s.buttons === 0) {
          const a = s, i = t.getScene(), l = it(i, a.layerX, a.layerY);
          y(l) && (console.log({ mesh: l }), Z(i, (c) => {
            N(c.material) || c.material && (c.material.wireframe = !1);
          }), l.material && (l.material.wireframe = !0));
        }
      },
      auxclick: (s) => {
        if (s.button !== 1)
          return;
        const a = t.getScene(), i = it(a, s.clientX, s.clientY);
        N(i);
      },
      contextmenu: (s) => {
        console.log("should context");
      }
    },
    {
      propagate: !1,
      parent: o
    }
  );
}, ne = (t, r, {
  unitsTall: e = 1,
  unitsWide: n = 1,
  height: o = 100,
  disposeActive: s = !1
} = {}) => {
  s && t?.activeCamera?.dispose();
  const a = new K(r, g(0, 0, o), t);
  return a.target = g(0, 0, 0), a.rotation = g(0, Math.PI, Math.PI), a.orthoTop = -e / 2, a.orthoBottom = e / 2, a.orthoLeft = -n / 2, a.orthoRight = n / 2, a.mode = B.ORTHOGRAPHIC_CAMERA, a;
}, q = (t, r, e) => {
  const n = t.getCameraByName(r);
  return y(n) ? n : e();
}, j = (t, r) => {
  const {
    alpha: e,
    beta: n,
    radius: o,
    target: s,
    position: a,
    rotation: i,
    minZ: l,
    maxZ: c,
    mode: f,
    orthoTop: m,
    orthoBottom: u,
    orthoLeft: d,
    orthoRight: x
  } = r;
  p(a, (h) => {
    t.position = g(h);
  }), p(l, (h) => {
    t.minZ = h;
  }), p(c, (h) => {
    t.maxZ = h;
  }), p(f, (h) => {
    t.mode = ct[h];
  }), p(f, (h) => {
    t.mode = ct[h];
  }), p(m, (h) => {
    t.orthoTop = h;
  }), p(u, (h) => {
    t.orthoBottom = h;
  }), p(d, (h) => {
    t.orthoLeft = h;
  }), p(x, (h) => {
    t.orthoRight = h;
  }), t instanceof Ot && (p(i, (h) => {
    t.rotation = g(h);
  }), p(s, (h) => {
    t.target = g(h);
  })), t instanceof J && (p(e, (h) => {
    t.alpha = h;
  }), p(n, (h) => {
    t.alpha = h;
  }), p(o, (h) => {
    t.radius = h;
  }));
}, oe = (t, r, e = {}) => {
  const n = q(t, r, () => {
    const { alpha: o = 0, beta: s = 0, radius: a = 2, target: i } = e;
    return new J(r, o, s, a, g(i), t);
  });
  return j(n, e), n;
}, se = (t, r, e = {}) => {
  const n = q(t, r, () => {
    const { position: o } = e;
    return new K(r, g(o), t);
  });
  return j(n, e), n;
}, ae = (t, r) => {
  t?.activeCamera?.dispose();
  const e = t.getEngine().getRenderingCanvas(), n = -Math.PI / 2, o = Math.PI / 2.5, s = new J(r, n, o, 15, g(0, 0, 0), t);
  s.attachControl(e, !0), s.mode = B.PERSPECTIVE_CAMERA;
}, ct = {
  orthographic: B.ORTHOGRAPHIC_CAMERA,
  perspective: B.PERSPECTIVE_CAMERA
}, ie = {
  getArcRotateCamera: oe,
  getCamera: q,
  updateCamera: j,
  getUniversalCamera: se,
  attachArcRotateCameraControls: bt,
  attachUniversalCameraControls: re,
  createTopDownCamera: ne,
  createDebugCamera: ae
}, tt = (t, r, e) => {
  const n = t.getLightByName(r);
  return y(n) ? n : e();
}, et = (t, r) => {
  const { intensity: e, direction: n, position: o } = r;
  p(e, (s) => {
    t.intensity = s;
  }), t instanceof gt && p(n, (s) => {
    t.direction = g(s);
  }), t instanceof mt && p(o, (s) => {
    t.position = g(s);
  });
}, ce = (t, r, e = {}) => {
  const n = tt(t, r, () => {
    const { direction: o } = e;
    return new gt(r, g(o), t);
  });
  return et(n, e), n;
}, le = (t, r, e = {}) => {
  const n = tt(t, r, () => {
    const { position: o } = e;
    return new mt(r, g(o), t);
  });
  return et(n, e), n;
}, ue = {
  getLight: tt,
  getHemisphericLight: ce,
  getPointLight: le,
  updateLight: et
}, E = (t, r, e, n = !1) => {
  const o = t.getMeshByName(r);
  return y(o) && !n ? o : y(o) && n ? e(o) : e();
}, de = (t, r, e) => {
  const {
    alpha: n,
    diffuseTexture: o,
    emissiveTexture: s,
    ambientTexture: a,
    opacityTexture: i,
    diffuseColor: l,
    specularColor: c,
    ambientColor: f,
    emissiveColor: m
  } = e;
  p(o, (u) => {
    const d = t.getTextureByName(u);
    r.diffuseTexture = d;
  }), p(s, (u) => {
    const d = t.getTextureByName(u);
    r.emissiveTexture = d;
  }), p(a, (u) => {
    const d = t.getTextureByName(u);
    r.ambientTexture = d;
  }), p(i, (u) => {
    const d = t.getTextureByName(u);
    r.opacityTexture = d;
  }), p(l, (u) => {
    r.diffuseColor = T(u);
    const d = C.from(u).alpha();
    d < 1 && (r.alpha = d);
  }), p(c, (u) => {
    r.specularColor = T(u);
  }), p(f, (u) => {
    r.ambientColor = T(u);
  }), p(m, (u) => {
    r.specularColor = T(u);
  }), p(n, (u) => {
    r.alpha = u;
  });
}, lt = (t, r, e) => {
  r instanceof D && de(t, r, e);
}, k = (t, r, e = "standard") => {
  const n = t.getMaterialByName(r);
  if (y(n))
    return n;
  const o = typeof e == "string" ? e : e?.type ?? "standard";
  switch (o) {
    case "standard": {
      const s = new D(r, t);
      return lt(t, s, e), s;
    }
    case "pbr": {
      const s = new Ft(r, t);
      return lt(t, s, e), s;
    }
    default:
      throw new Error(`Unknown material type: '${o}'`);
  }
}, v = (t, r, e) => {
  const { position: n, color: o, material: s, receiveShadows: a } = e;
  r instanceof I && y(s) && (r.material = k(t, s, "standard")), r instanceof I && y(a) && (r.receiveShadows = a), p(n, (i) => {
    r.position = g(i);
  }), p(o, (i) => {
    const l = r.material;
    if (l instanceof D) {
      l.diffuseColor = T(i);
      const c = C.from(i).alpha();
      c < 1 && (l.alpha = c), l.specularColor = T("black"), l.ambientColor = T(i), l.emissiveColor = T(i);
    }
  });
}, Et = (t, r, e = {}) => E(t, r, () => {
  const { width: n = 1, height: o = 1, depth: s = 1, colors: a } = e, i = S.CreateBox(
    r,
    {
      width: n,
      height: o,
      depth: s,
      faceColors: y(a) ? a.map(O) : void 0
    },
    t
  );
  return v(t, i, e), i;
}), St = (t, r, e) => {
  const {
    width: n = 1,
    height: o = 1,
    depth: s = 1,
    material: a,
    receiveShadows: i = !1
  } = e, l = `box-instance-root-${JSON.stringify([
    n,
    o,
    s,
    a,
    i
  ])}`;
  let c = t.getMeshByName(l);
  if (N(c)) {
    if (c = S.CreateBox(l, { width: n, height: o, depth: s }, t), c.receiveShadows = i, c.isVisible = !1, !a)
      throw new Error("No material", { cause: e });
    c.material = k(t, a, "standard");
  }
  const f = c.createInstance(r);
  return v(t, f, e), f;
}, he = (t, r, e) => {
  const { radius: n = 0.5 } = e;
  return E(t, r, () => {
    const o = S.CreateSphere(
      r,
      { diameter: n * 2 },
      t
    );
    return v(t, o, e), o;
  });
}, fe = (t, r, e, n = {}) => {
  const {
    predicate: o = (l) => l.isPickable,
    camera: s = t.activeCamera
  } = n, a = t.createPickingRay(r, e, ft.Identity(), s);
  return t.pickWithRay(a, o)?.pickedMesh;
}, ge = (t) => {
  t.computeWorldMatrix(!0), t.refreshBoundingInfo({});
  const [r, e, n] = L(t.getAbsolutePosition()), o = t.getBoundingInfo().boundingSphere.radius;
  return [r, e, n - o];
}, X = (t, r) => {
  if (t instanceof _)
    return t.meshes.forEach((e) => X(e, r));
  r(t), t.getChildMeshes().forEach((e) => X(e, r));
}, me = {
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
}, pe = (t, r, e = {}) => E(t, r, () => {
  const { size: n = 1, type: o = "tetrahedron" } = e, s = S.CreatePolyhedron(
    r,
    { type: me[o], size: n },
    t
  );
  return v(t, s, e), s;
}), ye = (t) => {
  const r = t.getBoundingInfo().boundingBox.vectors, e = t.getScene(), n = e.getEngine().getRenderingCanvas();
  if (!n)
    throw new Error("No canvas for scene", { cause: e });
  const o = t.getWorldMatrix(), s = e.getTransformMatrix(), a = e.activeCamera.viewport, i = r.map((d) => {
    const x = W.Project(d, o, s, a);
    return x.x = x.x * n.clientWidth, x.y = x.y * n.clientHeight, x;
  }), [l, c] = at(i, (d) => d.x), [f, m] = at(i, (d) => d.y);
  return {
    width: c - l,
    height: m - f,
    left: l,
    top: f,
    right: c,
    bottom: m
  };
}, xe = (t, r, e = {}) => {
  const {
    recurse: n = !0,
    disposeMaterials: o = !1,
    disposeTextures: s = !1
  } = e, a = t.getMeshByName(r);
  if (a) {
    if (a.dispose(!n, !1), o) {
      const i = a.material;
      if (!i)
        return;
      i.name = `DISPOSED-${i.name}`, i?.dispose(!0, s), t.removeMaterial(i);
    }
    t.removeMesh(a);
  }
}, we = (t) => {
  if (!N(t))
    return t.sort((r, e) => r.distance - e.distance), t[0];
}, Me = (t, r, e = {}) => E(t, r, () => {
  const { arc: n = 1, height: o = 1, radius: s = 0.5, tag: a } = e, i = S.CreateCylinder(
    r,
    {
      height: o,
      arc: n,
      diameter: s * 2
    },
    t
  );
  return v(t, i, e), i;
}), Te = (t, r, e) => {
  const { updatable: n = !1 } = e;
  return E(
    t,
    r,
    (o) => be(t, r, {
      ...e,
      instance: o
      // updatable: undefined,
    }),
    n
  );
}, be = (t, r, e) => {
  const {
    colors: n = [],
    points: o = [],
    color: s = "white",
    updatable: a = !1,
    useVertexAlpha: i,
    instance: l
  } = e, c = o.map((u, d) => n[d] ?? s).map((u) => O(u)), f = o.map((u) => g(u)), m = S.CreateLines(r, {
    points: f,
    colors: c,
    updatable: a,
    useVertexAlpha: i,
    instance: l
  });
  return v(t, m, e), m;
}, Y = (t, r, e) => {
  const n = t.getMeshByName(r);
  return y(n) ? Promise.resolve(n) : e();
}, Ce = (t, r, e, n) => E(t, r, () => {
  const o = E(t, e, n);
  return wt.assertValue(o, () => (console.log({ scene: t, name: r, rootName: e, producer: n }), "Unable to create mesh instance. Missing root mesh.")), o.createInstance(r);
}), Ee = async (t, r, e, n) => Y(t, r, async () => {
  const o = await Y(t, e, n);
  return wt.assertValue(o, () => (console.log({ scene: t, name: r, rootName: e, producer: n }), "Unable to create mesh instance. Missing root mesh.")), o.createInstance(r);
}), Se = (t, r, e = {}) => E(t, r, () => {
  const { width: n = 1, height: o = 1, tag: s } = e, a = S.CreatePlane(
    r,
    {
      width: n,
      height: o
    },
    t
  ), { billboard: i } = e;
  return i && (a.billboardMode = I.BILLBOARDMODE_ALL), v(t, a, e), a;
}), ve = (t, r, e = {}) => E(t, r, () => {
  const { radius: n = 0.5 } = e, o = S.CreateTorusKnot(r, { radius: n }, t);
  return v(t, o, e), o;
}), Pe = (t) => {
  const { XYZI: r, SIZE: e } = t, n = e.z, o = 1 / n / 2, s = 1 / n / 2, a = 1 / n / 2;
  return r.map((i) => {
    const [l, c, f] = L(i), m = (l - e.x / 2) / n + o, u = (c - e.y / 2) / n + s, d = (f - e.z / 2) / -n - a;
    return Qt(qt(m, u, d), i.i);
  });
}, vt = (t, r, e) => {
  const { XYZI: n, RGBA: o, SIZE: s } = r, a = o.map((m) => {
    const { r: u, g: d, b: x, a: h } = m;
    return C.builder({ color: [u, d, x, h], model: "rgba" }).toString();
  }), i = new pt(e, t), l = 1 / s.z, c = S.CreateBox("temp-box", {
    width: l,
    height: l,
    depth: l
  });
  i.addShape(c, n.length), i.buildMesh(), c.dispose(), Pe(r).forEach((m, u) => {
    const [d, x] = m, h = i.particles[u];
    h.position = g(d);
    const w = a[x];
    h.color = O(w);
  });
  const f = k(t, "vox-material", "standard");
  return f.specularColor = T("black"), i.mesh.material = f, i.setParticles(), i;
}, Ae = (t, r, e, n = {}) => {
  const o = t.metadata ?? {}, { voxes: s = {} } = o, a = s[e];
  if (N(a))
    throw console.log({ scene: t, name: r, src: e }), new Error(`No voxData found for ${e} ${r}`);
  const i = vt(t, a, r), l = i.mesh;
  return v(t, l, n), i;
}, Re = (t) => t instanceof zt, Ie = (t, r) => {
  const [e, n] = ut(H.normalize2(H.subtract2(r, t)));
  return Math.atan2(n, e) + Math.PI / 2;
}, Pt = (t, r = {}) => {
  const {
    disposeSource: e = !1,
    allow32BitsIndices: n = !0,
    meshSubclass: o = void 0,
    subdivideWithSubMeshes: s = !1,
    multiMultiMaterials: a = !1
  } = r;
  return I.MergeMeshes(
    t,
    e,
    n,
    o,
    s,
    a
  );
}, Le = (t, r, e, n = {}) => {
  const {
    predicate: o = (a) => a.isPickable,
    camera: s = t.activeCamera
  } = n;
  if (!s)
    throw new Error("Camera required");
  return t.multiPick(r, e, o, s);
}, At = (t, r = /.*/, e = 0) => {
  const n = "".padStart(e * 2);
  if (r.test(t.name)) {
    console.log(`${n}mesh: '${t.name}'`);
    const o = t.material;
    y(o) && Object.entries(o).filter(
      (a) => /.Texture$/.test(a[0])
    ).map((a) => {
      const [i, l] = a;
      l instanceof R && i !== "_environmentBRDFTexture" && console.log(`${n}tex: '${l.name}' (${i})`);
    });
  }
  t.getChildMeshes().map((o) => At(o, r, e + 1));
}, Be = {
  lookAt: Ie,
  getBox: Et,
  describeMesh: At,
  getPlane: Se,
  getBoxInstance: St,
  getSphere: he,
  getCylinder: Me,
  getTorusKnot: ve,
  getLine: Te,
  walkMeshes: X,
  pickMesh: fe,
  getMesh: E,
  getMeshAsync: Y,
  calcTopOfMeshWorldPosition: ge,
  mergeMeshes: Pt,
  getVoxModel: Ae,
  calcClientRectForMesh: ye,
  updateArcRotateCameraPosition: Tt,
  findClosestPick: we,
  destroyMesh: xe,
  getMeshInstance: Ce,
  getMeshInstanceAsync: Ee,
  isInstancedMesh: Re,
  pickMeshes: Le,
  getPolyhedron: pe,
  updateMesh: v
}, Ne = (t = $()) => {
  const r = new _(t), e = t.getRenderingCanvas();
  ie.getArcRotateCamera(r, "Camera", {}).attachControl(e, !0), ue.getHemisphericLight(r, "light1", {
    direction: [1, 1, 1]
  }), Be.getSphere(r, "sphere", {
    radius: 0.5
  });
  const o = { debug: !1 };
  return e.onkeyup = (s) => {
    s.ctrlKey && s.keyCode === 73 && (o.debug = !o.debug, o.debug ? r.debugLayer.hide() : (console.log("SHOW!"), r.debugLayer.show()));
  }, t.runRenderLoop(() => {
    r.render();
  }), r;
}, Nr = {
  createEngine: $,
  createCanvas: Ct,
  v3: g,
  c3: T,
  c4: O,
  helloWorld: Ne,
  attachEditorControls: bt
}, _e = ({
  canvas: t,
  ...r
}) => {
  const e = new yt(t, {
    powerPreference: "high-performance",
    ...r
  });
  return e.hideLoadingUI(), e;
}, ke = () => yt.IsSupportedAsync, _r = {
  createWebGlEngine: $,
  createWebGpuEngine: _e,
  isWebGpuCapable: ke
}, Ge = (t) => (r) => {
};
async function He(t, r = t.name) {
  return await t();
}
const rt = (t) => {
  const r = Ge();
  return new Promise((e, n) => {
    try {
      t.onAfterRenderCameraObservable.addOnce(() => {
        r(), e();
      }), t.render(!0);
    } catch (o) {
      n(o);
    }
  });
}, De = (t) => {
  console.log("fixing eyelashes", t.meshes), t.meshes.forEach((r) => {
    if (r.name.includes("Eyelashes") && (console.log("fixing eyelashes", r.name), r.name.includes("primitive1"))) {
      console.log("fixing eyelashes: primitive1", r.name);
      const e = r.material;
      if (!e)
        throw new Error("Mesh has no material", { cause: r });
      const n = e.getActiveTextures()[0];
      n.hasAlpha = !0, n.getAlphaFromRGB = !0, e.transparencyMode = 1, e.opacityTexture = n, r.visibility = 0.5, e.albedoColor = new dt(0, 0, 0);
    }
  });
}, $e = [
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
], Oe = [
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
], Rt = (t) => {
  const r = t?.material?.getActiveTextures() ?? [];
  if (y(
    r.find((e) => {
      const n = e?.name;
      return y($e.find((o) => n.includes(o)));
    })
  ) && (t.visibility = 0), y(
    r.find((e) => {
      const n = e?.name;
      return y(Oe.find((o) => n.includes(o)));
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
  t.getChildMeshes().map(Rt);
}, Fe = (t) => {
  console.log("fixing bump maps", t.meshes), t.meshes.forEach((r) => {
    const e = r.material;
    e && (e.bumpTexture = null);
  });
}, ze = (t) => {
  De(t), t.meshes.map(Rt), Fe(t);
}, Ue = (t) => {
  const { path: r, scene: e, name: n = r instanceof File ? r.name : r } = t;
  return e.getEngine().hideLoadingUI(), new Promise((s, a) => {
    try {
      st.ShowLoadingScreen = !1, st.Append(
        "",
        r,
        e,
        (i) => {
          const l = i.getMeshByName("__root__");
          if (!l)
            throw new Error("No root mesh found", { cause: i });
          l.name = n, i.cameras.length > 0 && (i.activeCamera = i.cameras[0]), i.animationGroups.forEach((c) => {
            c.stop();
          }), ze(i), s(l);
        },
        (i) => {
        },
        (i, l, c) => {
          console.log({ path: r, scene: i, message: l, reason: c }), a(c);
        }
      );
    } catch (i) {
      a(i);
    }
  });
}, kr = {
  renderOnce: rt,
  loadDazFigure: Ue
  // fixDazFigure,
  // loadAssetContainer,
  // builder,
}, It = (t, r = t.width, e = t.height) => {
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
}, Ve = async (t) => {
  if (typeof t == "string")
    return t;
  const r = document.createElement("canvas");
  return r.width = t.width, r.height = t.height, r.getContext("2d").drawImage(t, 0, 0), await ee.toSrcString(r);
}, Lt = async (t, r, e) => {
  if (e instanceof HTMLCanvasElement)
    return new Promise((o, s) => {
      try {
        const a = new Q(r, e, t);
        a.update(), a.hasAlpha = !0, o(a);
      } catch (a) {
        s(a);
      }
    });
  const n = await Ve(e);
  return new Promise((o, s) => {
    try {
      const a = new R(n, t, !1, !0);
      a.name = r, a.hasAlpha = !0, a.onLoadObservable.addOnce(() => {
        o(a);
      });
    } catch (a) {
      s(a);
    }
  });
}, We = async (t, r) => {
  const e = Mt.randomUuid(), { size: n, image: o, color: s } = t, a = S.CreatePlane(
    `plane-${e}`,
    {
      width: n,
      height: n
    },
    r
  ), i = new D(`material-${e}`, r);
  if (y(o)) {
    const l = await Lt(r, `layer-${e}`, o);
    t._texture = l, t._mesh = a, t._material = i, l.hasAlpha = !0, i.opacityTexture = l, i.emissiveTexture = l;
  }
  return y(s) && (i.emissiveColor = T(s)), a.material = i, a;
}, Ze = async (t, r) => {
  const e = new _(r);
  return await Promise.all(
    t.map(async (n, o) => {
      const s = await We(n, e);
      return s.position.set(0, 0, -o), s;
    })
  ), e;
}, Xe = ({ size: t } = { size: 4096 }) => {
  const r = $({ width: t, height: t }), e = r.getRenderingCanvas(), n = {
    layers: []
  }, o = {
    addLayer: (s) => (n.layers.push({ size: t, ...s }), o),
    render: async () => He(async () => {
      const s = await Ze(n.layers, r), a = new K("camera1", g(0, 0, -1e3), s);
      if (a.setTarget(g()), a.rotation = g(0, 0, Math.PI), a.mode = B.ORTHOGRAPHIC_CAMERA, a.minZ = 0, a.maxZ = 1e5, await rt(s), o.clear(), !e)
        throw new Error("No canvas found", { cause: r });
      return It(e);
    }, "Texture render"),
    clear: () => (n.layers.forEach((s) => {
      s?._cached || (s?._texture?.dispose(), s?._mesh?.dispose(), s?._material?.dispose());
    }), n.layers.length = 0, o)
  };
  return o;
}, nt = (t, r) => {
  const e = t.getSize(), n = t.getContext();
  r(n, e), t.update();
}, Ye = (t) => {
  nt(t, (r, e) => {
    const { width: n, height: o } = e;
    r.clearRect(0, 0, n, o);
  });
}, Ke = (t, r = "DEBUG IMAGE") => {
  const e = rr.copyToCanvas(t, 1024, 1024);
  e.style.border = "1px solid grey";
  const n = document.createElement("div");
  return n.textContent = r, document.body.appendChild(n), document.body.appendChild(e), new Promise((o, s) => {
    const a = () => {
      e.remove(), n.remove(), o(void 0);
    };
    e.onclick = a, n.onclick = a;
  });
}, Je = (t, r) => {
  const e = t.getTextureByName(r);
  e && (e.dispose(), t.removeTexture(e));
}, Qe = (t, r = {}) => {
  const { color: e = "black" } = r;
  nt(t, (n, o) => {
    const { width: s, height: a } = o;
    n.fillStyle = C.from(e).toString(), n.fillRect(0, 0, s, a);
  });
}, qe = (t, r, e = {}) => {
  const {
    backgroundColor: n,
    outline: o = !0,
    color: s = "black",
    fontFamily: a = "monospace",
    fontStyle: i = "bold",
    outlineColor: l = C.builder({ color: "white" }).alpha(0.1).toString(),
    textureSize: c = Math.min(t.getSize().width, t.getSize().height)
  } = e;
  t.hasAlpha = !0;
  let f = c, m = `${i} ${f}px ${a}`;
  const u = t.getContext();
  u.font = m;
  let d = u.measureText(r);
  f = c / d.width * c, m = `${i} ${f}px ${a}`, u.font = m;
  const x = 0;
  d = u.measureText(r);
  const h = d.fontBoundingBoxAscent ?? 0, w = c - (c - h) / 2;
  u.lineWidth = f / 2;
  const b = {
    x: 0,
    y: w - f,
    width: c,
    height: h * 2
  };
  if (y(n)) {
    u.fillStyle = C.from(n).toString();
    const { x: P, y: U, width: V, height: ot } = b;
    u.fillRect(P, U, V, ot);
  }
  return o && (u.strokeStyle = l, u.strokeText(r, x, w)), u.fillStyle = s, u.fillText(r, x, w), t.hasAlpha = !0, t.update(), b;
}, Bt = {
  linearNearest: R.LINEAR_NEAREST,
  nearestNearest: R.NEAREST_NEAREST,
  linearLinear: R.LINEAR_LINEAR,
  nearestLinear: R.NEAREST_LINEAR
}, F = (t, r, e) => {
  const n = t.getTextureByName(r);
  return y(n) ? n : e();
}, z = (t, r) => {
  const { hasAlpha: e } = r;
  p(e, (n) => {
    t.hasAlpha = n;
  }), t instanceof Q && t.update();
}, je = (t, r, e = {}) => {
  const n = F(t, r, () => {
    const {
      generateMipMaps: o = !0,
      samplingMode: s = "linearNearest",
      width: a = 1024,
      height: i = 1024,
      init: l
    } = e, c = new Q(
      r,
      {
        width: a,
        height: i
      },
      t,
      o,
      Bt[s]
    );
    return l && (l(c.getContext()), c.update()), c;
  });
  return z(n, e), n;
}, Nt = (t) => Bt[t], tr = (t, r, e) => F(t, r, () => {
  const {
    element: n,
    generateMipMaps: o = !0,
    samplingMode: s = "linearNearest"
  } = e;
  if (!n)
    throw new Error("HTML element is required to create texture", {
      cause: e
    });
  const a = new Ut(r, n, {
    generateMipMaps: o,
    samplingMode: Nt(s),
    engine: t.getEngine(),
    scene: t
  });
  return z(a, e), a;
}), er = (t, r, e) => {
  const n = F(t, r, () => {
    const {
      src: o,
      generateMipMaps: s = !0,
      samplingMode: a = "linearNearest"
    } = e;
    if (!o)
      throw new Error("src is required", { cause: e });
    const i = new R(o, t, {
      samplingMode: Nt(a)
    });
    return i.name = r, i;
  });
  return z(n, e), n;
}, rr = {
  builder: Xe,
  copyToCanvas: It,
  debugImage: Ke,
  getTexture: F,
  getHtmlElementTexture: tr,
  getDynamicTexture: je,
  getPathTexture: er,
  updateTexture: z,
  imageToTexture: Lt,
  drawTextOnTexture: qe,
  drawOnTexture: nt,
  drawBackgroundOnTexture: Qe,
  clearTexture: Ye,
  destroyTexture: Je
}, nr = (t, r, e) => {
  const n = t?.effectLayers?.length ? t.getGlowLayerByName(r) : void 0;
  return y(n) ? n : new xt(r, t, e);
}, or = (t, r, e) => {
  const n = t.getHighlightLayerByName(r);
  return y(n) ? n : new Vt(r, t, e);
}, Gr = {
  getGlowLayer: nr,
  getHighlightLayer: or
}, Hr = {
  getMaterial: k
  // updateMaterial,
  // updateStandardMaterial,
}, sr = (t, r) => {
  const e = t.getTransformNodeByName(r);
  return y(e) ? e : new Wt(r, t);
}, Dr = {
  getTransformNode: sr
}, ar = (t, r, e) => {
  const o = (t.metadata ?? {}).solidParticleSystems?.[r];
  return y(o), e();
}, ir = (t, r, e = {}) => ar(t, r, () => {
  const { useModelMaterial: n = !1 } = e, o = new pt(r, t, {
    useModelMaterial: n
  }), s = t.metadata ?? {};
  t.metadata = s;
  const a = s.solidParticleSystems ?? {};
  return s.solidParticleSystems = a, a[r] = o, o;
}), $r = { getSolidParticleSystem: ir }, cr = (t, r, e) => new Zt(g(t), g(r), e), lr = (t, r, e = {}) => {
  const {
    trianglePredicate: n,
    fastCheck: o,
    predicate: s = (a) => a.isPickable
  } = e;
  return t.pickWithRay(r, s, o, n);
}, Or = {
  createRay: cr,
  pickWithRay: lr
}, ur = (t) => new _(t), dr = (t) => {
  t.debugLayer.isVisible() ? t.debugLayer.hide() : t.debugLayer.show();
}, Fr = {
  createScene: ur,
  toggleInspector: dr,
  renderOnce: rt
}, hr = (t) => {
  const r = t.getScene();
  t.dispose(), r.getLightsByTags("shadowCaster").forEach((n) => {
    n.metadata.shadowGenerator.removeShadowCaster(t);
  });
}, fr = (t) => (t.getScene().getLightsByTags("shadowCaster").forEach((n) => {
  n.metadata.shadowGenerator.addShadowCaster(t);
}), () => {
  hr(t);
}), zr = {
  addShadowToMesh: fr
}, gr = (t, r, e = {}) => {
  const n = new xt(r, t, e);
  return n.neutralColor = new ht(0, 0, 0, 0), n;
}, Ur = {
  addGlowLayer: gr,
  Constants: Xt
}, _t = (t, r, e = {}) => {
  const n = t?.spriteManagers?.find((i) => i.name === r);
  if (y(n))
    return n;
  const { capacity: o = 1, cellSize: s, imgUrl: a } = e;
  if (!a)
    throw new Error("imgUrl is required", { cause: e });
  return new Yt(r, a, o, s, t);
}, mr = (t, r, e) => {
  const n = te(_t(t, e)), o = n?.sprites?.find((s) => s.name === r);
  return y(o) ? o : new Kt(r, n);
}, Vr = { getSpriteManager: _t, getSprite: mr }, pr = (t, r = {}) => {
  const {
    random: e = Mt.globalRandom,
    radius: n = 1,
    maxBounce: o = 0,
    groundZ: s = 0,
    speed: a = 20,
    decay: i = 0.01,
    dispose: l = () => t.isVisible = !1
  } = r;
  {
    const c = t.props?.path;
    if (y(c) && c.length > 0) {
      const f = c.pop();
      if (!f)
        throw new Error("No next value from path", { cause: c });
      t.position = f;
      return;
    }
  }
  {
    const { bounces: c = o } = t.props ?? {};
    if (c <= 0) {
      e() < i && l();
      return;
    }
    const f = c / o, m = t.position, [u, d, x] = L(m), h = (Dt) => (e() * n * 2 - n) * (f / 4) + Dt, [w, b] = [h(u), h(d)], P = g([w, b, s]), [U, V, ot] = L(H.midPoint3(m, P)), kt = g(U, V, x - e() * f * 3), Gt = {
      path: Jt.CreateCatmullRomSpline([m, kt, P], a).getPoints().reverse(),
      bounces: c - 1
      // rotationAxis: [2 * random() - 1, 2 * random() - 1, 2 * random() - 1],
    }, Ht = t.props ?? {};
    t.props = { ...Ht, ...Gt };
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
    e = e || ((s) => s === "true");
    let n;
    const o = r.split("||");
    for (const s in o)
      if (Object.prototype.hasOwnProperty.call(o, s)) {
        let a = A._SimplifyNegation(o[s].trim());
        const i = a.split("&&");
        if (i.length > 1)
          for (let l = 0; l < i.length; ++l) {
            const c = A._SimplifyNegation(i[l].trim());
            if (c !== "true" && c !== "false" ? c[0] === "!" ? n = !e(c.substring(1)) : n = e(c) : n = c === "true", !n) {
              a = "false";
              break;
            }
          }
        if (n || a === "true") {
          n = !0;
          break;
        }
        a !== "true" && a !== "false" ? a[0] === "!" ? n = !e(a.substring(1)) : n = e(a) : n = a === "true";
      }
    return n ? "true" : "false";
  }
  static _SimplifyNegation(r) {
    return r = r.replace(/^[\s!]+/, (e) => (e = e.replace(/[\s]/g, () => ""), e.length % 2 ? "!" : "")), r = r.trim(), r === "!true" ? r = "false" : r === "!false" && (r = "true"), r;
  }
}
class M {
  /**
   * Adds support for tags on the given object
   * @param obj defines the object to use
   */
  static EnableFor(r) {
    r._tags = r._tags || {}, r.hasTags = () => M.HasTags(r), r.addTags = (e) => M.AddTagsTo(r, e), r.removeTags = (e) => M.RemoveTagsFrom(r, e), r.matchesTagsQuery = (e) => M.MatchesQuery(r, e);
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
      M._AddTagTo(r, o);
  }
  /**
   * @internal
   */
  static _AddTagTo(r, e) {
    e = e.trim(), !(e === "" || e === "true" || e === "false") && (e.match(/[\s]/) || e.match(/^([!]|([|]|[&]){2})/) || (M.EnableFor(r), r._tags[e] = !0));
  }
  /**
   * Removes specific tags from a specific object
   * @param obj defines the object to use
   * @param tagsString defines the tags to remove
   */
  static RemoveTagsFrom(r, e) {
    if (!M.HasTags(r))
      return;
    const n = e.split(" ");
    for (const o in n)
      M._RemoveTagFrom(r, n[o]);
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
    return e === void 0 ? !0 : e === "" ? M.HasTags(r) : A.Eval(e, (n) => M.HasTags(r) && r._tags[n]);
  }
}
const yr = (t, r, e) => {
  const { XYZI: n, RGBA: o } = r, s = o.map((i) => {
    const { r: l, g: c, b: f, a: m } = i;
    return C.builder({ color: [l, c, f, m], model: "rgba" }).toString();
  }), a = new I(e, t);
  return n.map((i, l) => {
    const c = s[i.i], f = St(t, `voxel-${c}`, {
      color: c,
      material: `voxel-material-${c}`
    });
    return f.position = g(i), f.parent = a, f;
  }), M.AddTagsTo(a, "complex"), a;
}, xr = (t) => {
  const r = Object.entries(t).sort((e, n) => {
    const [o] = e, [s] = n;
    return o.localeCompare(s);
  });
  return JSON.stringify(r);
}, wr = (t) => {
  const r = {};
  return t.forEach((e) => {
    const n = e?.material?.name;
    if (!n)
      throw new Error("Mesh material is missing name", { cause: e });
    const o = r[n] ?? [];
    o.push(e), r[n] = o;
  }), r;
}, Mr = (t, r, e) => {
  const { XYZI: n, RGBA: o } = r, s = o.map((u) => {
    const { r: d, g: x, b: h, a: w } = u;
    return C.builder({ color: [d, x, h, w], model: "rgba" }).toString();
  }), a = n.map((u, d) => {
    const x = s[u.i], [h, w, b] = L(u), P = Et(
      t,
      `voxel-merged-${x}-${xr(u)}`,
      {
        position: [h, w, b],
        // color,
        // material: `voxel-merged-material-${color}`,
        material: "voxel-material",
        colors: jt.from(6).map(() => x)
      }
    );
    return P.setEnabled(!1), P;
  }), i = wr(a), l = Object.values(i).map((u) => Pt(u)), c = new I(`merged-${e}`, t);
  l.filter(y).forEach((u) => u.parent = c);
  const f = k(t, "voxel-material", "standard");
  l.filter(y).forEach((u) => u.material = f), c.metadata = {
    voxels: a
  }, M.AddTagsTo(c, "merged");
  const m = new I(e, t);
  return m.metadata = {
    voxels: a
  }, c.parent = m, m;
}, Wr = {
  animateExplosion: pr,
  voxDataToSps: vt,
  voxDataToMergedModel: Mr,
  voxDataToComplexModel: yr
};
export {
  Nr as Babs,
  ct as CAMERA_MODES,
  ie as Cameras,
  _r as Engines,
  Gr as Layers,
  ue as Lights,
  Hr as Materials,
  Be as Meshes,
  kr as Models,
  Dr as Nodes,
  $r as Particles,
  Or as Rays,
  Fr as Scenes,
  zr as Shadows,
  Ur as Specials,
  Vr as Sprites,
  rr as Textures,
  Wr as Voxels,
  gr as addGlowLayer,
  ar as getParticleSystem,
  ir as getSolidParticleSystem,
  mr as getSprite,
  _t as getSpriteManager
};
