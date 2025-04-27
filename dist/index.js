import { Inputs as H } from "@mjt-engine/input";
import { toVec3 as L, Maths as $, toVec2 as ut } from "@mjt-engine/math";
import { Vector3 as V, Engine as Dt, Color3 as dt, Color4 as ht, Matrix as gt, Scene as _, UniversalCamera as K, Camera as B, TargetCamera as zt, ArcRotateCamera as J, HemisphericLight as ft, PointLight as mt, StandardMaterial as G, PBRMaterial as Wt, Mesh as R, MeshBuilder as S, SolidParticleSystem as pt, InstancedMesh as Ut, Texture as I, WebGPUEngine as yt, SceneLoader as st, DynamicTexture as Q, HtmlElementTexture as Vt, GlowLayer as wt, HighlightLayer as Zt, TransformNode as Xt, Ray as Yt, Constants as Kt, SpriteManager as Jt, Sprite as Qt, Curve3 as qt } from "@babylonjs/core";
import { Colors as C } from "@mjt-engine/color";
import { isUndefined as N, isDefined as w, iff as y, tuple2 as jt, tuple3 as te, Arrays as ee } from "@mjt-engine/object";
import { extent as at } from "d3-array";
import { Asserts as xt, assertValue as re } from "@mjt-engine/assert";
import { Randoms as bt } from "@mjt-engine/random";
import { Images as ne } from "@mjt-engine/image";
import "@babylonjs/inspector";
function m(t = 0, r = 0, e = 0) {
  if (typeof t == "number")
    return new V(t, r, e);
  const [n = 0, o = 0, s = 0] = L(t);
  return new V(n, o, s);
}
const Mt = (t, r) => {
  const e = t.alpha, n = t.beta, o = t.radius;
  t.target = t.target.add(m(r)), t.radius = o, t.alpha = e, t.beta = n;
}, Tt = (t, r = {}) => {
  const {
    keySensitivity: e = 0.5,
    mouseSensitivity: n = 0.05,
    parent: o = document.body,
    action: s = () => {
    }
  } = r, a = t.alpha, i = t.beta, l = t.radius;
  m(t.target);
  const c = (d = 0, p = 0, h = 0) => {
    Mt(t, [d, p, h]), s();
  }, g = H.listenToKey(
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
  ), f = {
    lastPosition: void 0
  };
  o.addEventListener("pointerdown", (d) => {
    d.buttons === 4 && (f.lastPosition = d);
  }), o.addEventListener("pointermove", (d) => {
    if (d.buttons !== 4)
      return;
    const { lastPosition: p = d } = f;
    f.lastPosition = d;
    const h = $.subtract2(p, d), [x, b] = ut(h);
    if (d.buttons === 4 && d.shiftKey) {
      t.beta = t.beta + b * n;
      return;
    }
    d.buttons === 4 && (c(b * n, -b * n, 0), c(x * n, x * n, 0));
  });
  const u = H.listenToMouse(
    {
      wheel: (d) => {
        if (d instanceof WheelEvent) {
          const p = d.deltaY * n;
          t.radius += p, s();
        }
      }
    },
    {
      parent: o
    }
  );
  return [g, u];
}, Ct = ({
  width: t = 320,
  height: r = 320
}) => {
  const e = document.createElement("canvas");
  return e.width = t, e.height = r, e;
}, O = (t) => {
  const r = t instanceof HTMLCanvasElement || t instanceof OffscreenCanvas ? {} : t ?? {}, e = t instanceof HTMLCanvasElement || t instanceof OffscreenCanvas ? t : Ct({
    width: t?.width ?? 320,
    height: t?.height ?? 320
  }), { antialias: n } = r, o = new Dt(e, n, {
    powerPreference: "high-performance",
    ...r
  });
  return o.hideLoadingUI(), o;
}, T = (t) => {
  const r = C.builder({ color: t }).hex();
  return dt.FromHexString(r);
}, F = (t) => {
  const r = C.builder({ color: t }), e = ht.FromHexString(r.hex());
  return e.a = r.alpha(), e;
}, it = (t, r, e, n = {}) => {
  const { camera: o = t.activeCamera, predicate: s = () => !0 } = n, a = t.createPickingRay(r, e, gt.Identity(), o);
  return t.pickWithRay(a, s)?.pickedMesh;
}, Z = (t, r) => {
  if (t instanceof _)
    return t.meshes.forEach((e) => Z(e, r));
  r(t), t.getChildMeshes().forEach((e) => Z(e, r));
}, oe = (t, r = {}) => {
  const {
    keySensitivity: e = 0.05,
    mouseSensitivity: n = 0.05,
    parent: o = document.body
  } = r;
  H.listenToKey(
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
  ), H.listenToMouse(
    {
      wheel: (s) => {
        if (s instanceof WheelEvent) {
          if (s.shiftKey) {
            const i = s.deltaX * n;
            t.position.addInPlace(m(0, -i, 0));
            return;
          }
          const a = s.deltaY * n;
          t.position.addInPlace(m(0, 0, a));
        }
      },
      click: (s) => {
        if (s.buttons === 0) {
          const a = s, i = t.getScene(), l = it(i, a.layerX, a.layerY);
          w(l) && (console.log({ mesh: l }), Z(i, (c) => {
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
}, se = (t, r, {
  unitsTall: e = 1,
  unitsWide: n = 1,
  height: o = 100,
  disposeActive: s = !1
} = {}) => {
  s && t?.activeCamera?.dispose();
  const a = new K(r, m(0, 0, o), t);
  return a.target = m(0, 0, 0), a.rotation = m(0, Math.PI, Math.PI), a.orthoTop = -e / 2, a.orthoBottom = e / 2, a.orthoLeft = -n / 2, a.orthoRight = n / 2, a.mode = B.ORTHOGRAPHIC_CAMERA, a;
}, q = (t, r, e) => {
  const n = t.getCameraByName(r);
  return w(n) ? n : e();
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
    mode: g,
    orthoTop: f,
    orthoBottom: u,
    orthoLeft: d,
    orthoRight: p
  } = r;
  y(a, (h) => {
    t.position = m(h);
  }), y(l, (h) => {
    t.minZ = h;
  }), y(c, (h) => {
    t.maxZ = h;
  }), y(g, (h) => {
    t.mode = ct[h];
  }), y(g, (h) => {
    t.mode = ct[h];
  }), y(f, (h) => {
    t.orthoTop = h;
  }), y(u, (h) => {
    t.orthoBottom = h;
  }), y(d, (h) => {
    t.orthoLeft = h;
  }), y(p, (h) => {
    t.orthoRight = h;
  }), t instanceof zt && (y(i, (h) => {
    t.rotation = m(h);
  }), y(s, (h) => {
    t.target = m(h);
  })), t instanceof J && (y(e, (h) => {
    t.alpha = h;
  }), y(n, (h) => {
    t.alpha = h;
  }), y(o, (h) => {
    t.radius = h;
  }));
}, ae = (t, r, e = {}) => {
  const n = q(t, r, () => {
    const { alpha: o = 0, beta: s = 0, radius: a = 2, target: i } = e;
    return new J(r, o, s, a, m(i), t);
  });
  return j(n, e), n;
}, ie = (t, r, e = {}) => {
  const n = q(t, r, () => {
    const { position: o } = e;
    return new K(r, m(o), t);
  });
  return j(n, e), n;
}, ce = (t, r) => {
  t?.activeCamera?.dispose();
  const e = t.getEngine().getRenderingCanvas(), n = -Math.PI / 2, o = Math.PI / 2.5, s = new J(r, n, o, 15, m(0, 0, 0), t);
  s.attachControl(e, !0), s.mode = B.PERSPECTIVE_CAMERA;
}, ct = {
  orthographic: B.ORTHOGRAPHIC_CAMERA,
  perspective: B.PERSPECTIVE_CAMERA
}, le = {
  getArcRotateCamera: ae,
  getCamera: q,
  updateCamera: j,
  getUniversalCamera: ie,
  attachArcRotateCameraControls: Tt,
  attachUniversalCameraControls: oe,
  createTopDownCamera: se,
  createDebugCamera: ce
}, tt = (t, r, e) => {
  const n = t.getLightByName(r);
  return w(n) ? n : e();
}, et = (t, r) => {
  const { intensity: e, direction: n, position: o } = r;
  y(e, (s) => {
    t.intensity = s;
  }), t instanceof ft && y(n, (s) => {
    t.direction = m(s);
  }), t instanceof mt && y(o, (s) => {
    t.position = m(s);
  });
}, ue = (t, r, e = {}) => {
  const n = tt(t, r, () => {
    const { direction: o } = e;
    return new ft(r, m(o), t);
  });
  return et(n, e), n;
}, de = (t, r, e = {}) => {
  const n = tt(t, r, () => {
    const { position: o } = e;
    return new mt(r, m(o), t);
  });
  return et(n, e), n;
}, he = {
  getLight: tt,
  getHemisphericLight: ue,
  getPointLight: de,
  updateLight: et
}, E = (t, r, e, n = !1) => {
  const o = t.getMeshByName(r);
  return w(o) && !n ? o : w(o) && n ? e(o) : e();
}, ge = (t, r, e) => {
  const {
    alpha: n,
    diffuseTexture: o,
    emissiveTexture: s,
    ambientTexture: a,
    opacityTexture: i,
    diffuseColor: l,
    specularColor: c,
    ambientColor: g,
    emissiveColor: f
  } = e;
  y(o, (u) => {
    const d = t.getTextureByName(u);
    r.diffuseTexture = d;
  }), y(s, (u) => {
    const d = t.getTextureByName(u);
    r.emissiveTexture = d;
  }), y(a, (u) => {
    const d = t.getTextureByName(u);
    r.ambientTexture = d;
  }), y(i, (u) => {
    const d = t.getTextureByName(u);
    r.opacityTexture = d;
  }), y(l, (u) => {
    r.diffuseColor = T(u);
    const d = C.from(u).alpha();
    d < 1 && (r.alpha = d);
  }), y(c, (u) => {
    r.specularColor = T(u);
  }), y(g, (u) => {
    r.ambientColor = T(u);
  }), y(f, (u) => {
    r.specularColor = T(u);
  }), y(n, (u) => {
    r.alpha = u;
  });
}, lt = (t, r, e) => {
  r instanceof G && ge(t, r, e);
}, k = (t, r, e = "standard") => {
  const n = t.getMaterialByName(r);
  if (w(n))
    return n;
  const o = typeof e == "string" ? e : e?.type ?? "standard";
  switch (o) {
    case "standard": {
      const s = new G(r, t);
      return lt(t, s, e), s;
    }
    case "pbr": {
      const s = new Wt(r, t);
      return lt(t, s, e), s;
    }
    default:
      throw new Error(`Unknown material type: '${o}'`);
  }
}, v = (t, r, e) => {
  const { position: n, color: o, material: s, receiveShadows: a } = e;
  r instanceof R && w(s) && (r.material = k(t, s, "standard")), r instanceof R && w(a) && (r.receiveShadows = a), y(n, (i) => {
    r.position = m(i);
  }), y(o, (i) => {
    const l = r.material;
    if (l instanceof G) {
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
      faceColors: w(a) ? a.map(F) : void 0
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
  const g = c.createInstance(r);
  return v(t, g, e), g;
}, fe = (t, r, e) => {
  const { radius: n = 0.5 } = e;
  return E(t, r, () => {
    const o = S.CreateSphere(
      r,
      { diameter: n * 2 },
      t
    );
    return v(t, o, e), o;
  });
}, me = (t, r, e, n = {}) => {
  const {
    predicate: o = (l) => l.isPickable,
    camera: s = t.activeCamera
  } = n, a = t.createPickingRay(r, e, gt.Identity(), s);
  return t.pickWithRay(a, o)?.pickedMesh;
}, pe = (t) => {
  t.computeWorldMatrix(!0), t.refreshBoundingInfo({});
  const [r, e, n] = L(t.getAbsolutePosition()), o = t.getBoundingInfo().boundingSphere.radius;
  return [r, e, n - o];
}, X = (t, r) => {
  if (t instanceof _)
    return t.meshes.forEach((e) => X(e, r));
  r(t), t.getChildMeshes().forEach((e) => X(e, r));
}, ye = {
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
}, we = (t, r, e = {}) => E(t, r, () => {
  const { size: n = 1, type: o = "tetrahedron" } = e, s = S.CreatePolyhedron(
    r,
    { type: ye[o], size: n },
    t
  );
  return v(t, s, e), s;
}), xe = (t) => {
  const r = t.getBoundingInfo().boundingBox.vectors, e = t.getScene(), n = e.getEngine().getRenderingCanvas();
  if (!n)
    throw new Error("No canvas for scene", { cause: e });
  const o = t.getWorldMatrix(), s = e.getTransformMatrix(), a = e.activeCamera.viewport, i = r.map((d) => {
    const p = V.Project(d, o, s, a);
    return p.x = p.x * n.clientWidth, p.y = p.y * n.clientHeight, p;
  }), [l, c] = at(i, (d) => d.x), [g, f] = at(i, (d) => d.y);
  return {
    width: c - l,
    height: f - g,
    left: l,
    top: g,
    right: c,
    bottom: f
  };
}, be = (t, r, e = {}) => {
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
}, Me = (t) => {
  if (!N(t))
    return t.sort((r, e) => r.distance - e.distance), t[0];
}, Te = (t, r, e = {}) => E(t, r, () => {
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
}), Ce = (t, r, e) => {
  const { updatable: n = !1 } = e;
  return E(
    t,
    r,
    (o) => Ee(t, r, {
      ...e,
      instance: o
      // updatable: undefined,
    }),
    n
  );
}, Ee = (t, r, e) => {
  const {
    colors: n = [],
    points: o = [],
    color: s = "white",
    updatable: a = !1,
    useVertexAlpha: i,
    instance: l
  } = e, c = o.map((u, d) => n[d] ?? s).map((u) => F(u)), g = o.map((u) => m(u)), f = S.CreateLines(r, {
    points: g,
    colors: c,
    updatable: a,
    useVertexAlpha: i,
    instance: l
  });
  return v(t, f, e), f;
}, Y = (t, r, e) => {
  const n = t.getMeshByName(r);
  return w(n) ? Promise.resolve(n) : e();
}, Se = (t, r, e, n) => E(t, r, () => {
  const o = E(t, e, n);
  return xt.assertValue(o, () => (console.log({ scene: t, name: r, rootName: e, producer: n }), "Unable to create mesh instance. Missing root mesh.")), o.createInstance(r);
}), ve = async (t, r, e, n) => Y(t, r, async () => {
  const o = await Y(t, e, n);
  return xt.assertValue(o, () => (console.log({ scene: t, name: r, rootName: e, producer: n }), "Unable to create mesh instance. Missing root mesh.")), o.createInstance(r);
}), Pe = (t, r, e = {}) => E(t, r, () => {
  const { width: n = 1, height: o = 1, tag: s } = e, a = S.CreatePlane(
    r,
    {
      width: n,
      height: o
    },
    t
  ), { billboard: i } = e;
  return i && (a.billboardMode = R.BILLBOARDMODE_ALL), v(t, a, e), a;
}), Ae = (t, r, e = {}) => E(t, r, () => {
  const { radius: n = 0.5 } = e, o = S.CreateTorusKnot(r, { radius: n }, t);
  return v(t, o, e), o;
}), Ie = (t) => {
  const { XYZI: r, SIZE: e } = t, n = e.z, o = 1 / n / 2, s = 1 / n / 2, a = 1 / n / 2;
  return r.map((i) => {
    const [l, c, g] = L(i), f = (l - e.x / 2) / n + o, u = (c - e.y / 2) / n + s, d = (g - e.z / 2) / -n - a;
    return jt(te(f, u, d), i.i);
  });
}, vt = (t, r, e) => {
  const { XYZI: n, RGBA: o, SIZE: s } = r, a = o.map((f) => {
    const { r: u, g: d, b: p, a: h } = f;
    return C.builder({ color: [u, d, p, h], model: "rgba" }).toString();
  }), i = new pt(e, t), l = 1 / s.z, c = S.CreateBox("temp-box", {
    width: l,
    height: l,
    depth: l
  });
  i.addShape(c, n.length), i.buildMesh(), c.dispose(), Ie(r).forEach((f, u) => {
    const [d, p] = f, h = i.particles[u];
    h.position = m(d);
    const x = a[p];
    h.color = F(x);
  });
  const g = k(t, "vox-material", "standard");
  return g.specularColor = T("black"), i.mesh.material = g, i.setParticles(), i;
}, Re = (t, r, e, n = {}) => {
  const o = t.metadata ?? {}, { voxes: s = {} } = o, a = s[e];
  if (N(a))
    throw console.log({ scene: t, name: r, src: e }), new Error(`No voxData found for ${e} ${r}`);
  const i = vt(t, a, r), l = i.mesh;
  return v(t, l, n), i;
}, Le = (t) => t instanceof Ut, Be = (t, r) => {
  const [e, n] = ut($.normalize2($.subtract2(r, t)));
  return Math.atan2(n, e) + Math.PI / 2;
}, Pt = (t, r = {}) => {
  const {
    disposeSource: e = !1,
    allow32BitsIndices: n = !0,
    meshSubclass: o = void 0,
    subdivideWithSubMeshes: s = !1,
    multiMultiMaterials: a = !1
  } = r;
  return R.MergeMeshes(
    t,
    e,
    n,
    o,
    s,
    a
  );
}, Ne = (t, r, e, n = {}) => {
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
    w(o) && Object.entries(o).filter(
      (a) => /.Texture$/.test(a[0])
    ).map((a) => {
      const [i, l] = a;
      l instanceof I && i !== "_environmentBRDFTexture" && console.log(`${n}tex: '${l.name}' (${i})`);
    });
  }
  t.getChildMeshes().map((o) => At(o, r, e + 1));
}, It = {
  lookAt: Be,
  getBox: Et,
  describeMesh: At,
  getPlane: Pe,
  getBoxInstance: St,
  getSphere: fe,
  getCylinder: Te,
  getTorusKnot: Ae,
  getLine: Ce,
  walkMeshes: X,
  pickMesh: me,
  getMesh: E,
  getMeshAsync: Y,
  calcTopOfMeshWorldPosition: pe,
  mergeMeshes: Pt,
  getVoxModel: Re,
  calcClientRectForMesh: xe,
  updateArcRotateCameraPosition: Mt,
  findClosestPick: Me,
  destroyMesh: be,
  getMeshInstance: Se,
  getMeshInstanceAsync: ve,
  isInstancedMesh: Le,
  pickMeshes: Ne,
  getPolyhedron: we,
  updateMesh: v
}, _e = (t = O()) => {
  const r = new _(t), e = t.getRenderingCanvas();
  le.getArcRotateCamera(r, "Camera", {}).attachControl(e, !0), he.getHemisphericLight(r, "light1", {
    direction: [1, 1, 1]
  }), It.getSphere(r, "sphere", {
    radius: 0.5
  });
  const o = { debug: !1 };
  return e.onkeyup = (s) => {
    s.ctrlKey && s.keyCode === 73 && (o.debug = !o.debug, o.debug ? r.debugLayer.hide() : (console.log("SHOW!"), r.debugLayer.show()));
  }, t.runRenderLoop(() => {
    r.render();
  }), r;
}, $r = {
  createEngine: O,
  createCanvas: Ct,
  v3: m,
  c3: T,
  c4: F,
  helloWorld: _e,
  attachEditorControls: Tt
}, ke = async ({
  canvas: t,
  ...r
}) => {
  const e = new yt(t, {
    powerPreference: "high-performance",
    ...r
  });
  return e.hideLoadingUI(), await e.initAsync(), e;
}, He = () => yt.IsSupportedAsync, Gr = {
  createWebGlEngine: O,
  createWebGpuEngine: ke,
  isWebGpuCapable: He
}, $e = (t) => (r) => {
};
async function Ge(t, r = t.name) {
  return await t();
}
const rt = (t) => {
  const r = $e();
  return new Promise((e, n) => {
    try {
      t.onAfterRenderCameraObservable.addOnce(() => {
        r(), e();
      }), t.render(!0);
    } catch (o) {
      n(o);
    }
  });
}, Oe = (t) => {
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
}, Fe = [
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
], De = [
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
  if (w(
    r.find((e) => {
      const n = e?.name;
      return w(Fe.find((o) => n.includes(o)));
    })
  ) && (t.visibility = 0), w(
    r.find((e) => {
      const n = e?.name;
      return w(De.find((o) => n.includes(o)));
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
}, ze = (t) => {
  console.log("fixing bump maps", t.meshes), t.meshes.forEach((r) => {
    const e = r.material;
    e && (e.bumpTexture = null);
  });
}, We = (t) => {
  Oe(t), t.meshes.map(Rt), ze(t);
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
          }), We(i), s(l);
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
}, Or = {
  renderOnce: rt,
  loadDazFigure: Ue
  // fixDazFigure,
  // loadAssetContainer,
  // builder,
}, Lt = (t, r = t.width, e = t.height) => {
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
  return r.width = t.width, r.height = t.height, r.getContext("2d").drawImage(t, 0, 0), await ne.toSrcString(r);
}, Bt = async (t, r, e) => {
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
      const a = new I(n, t, !1, !0);
      a.name = r, a.hasAlpha = !0, a.onLoadObservable.addOnce(() => {
        o(a);
      });
    } catch (a) {
      s(a);
    }
  });
}, Ze = async (t, r) => {
  const e = bt.randomUuid(), { size: n, image: o, color: s } = t, a = S.CreatePlane(
    `plane-${e}`,
    {
      width: n,
      height: n
    },
    r
  ), i = new G(`material-${e}`, r);
  if (w(o)) {
    const l = await Bt(r, `layer-${e}`, o);
    t._texture = l, t._mesh = a, t._material = i, l.hasAlpha = !0, i.opacityTexture = l, i.emissiveTexture = l;
  }
  return w(s) && (i.emissiveColor = T(s)), a.material = i, a;
}, Xe = async (t, r) => {
  const e = new _(r);
  return await Promise.all(
    t.map(async (n, o) => {
      const s = await Ze(n, e);
      return s.position.set(0, 0, -o), s;
    })
  ), e;
}, Ye = ({ size: t } = { size: 4096 }) => {
  const r = O({ width: t, height: t }), e = r.getRenderingCanvas(), n = {
    layers: []
  }, o = {
    addLayer: (s) => (n.layers.push({ size: t, ...s }), o),
    render: async () => Ge(async () => {
      const s = await Xe(n.layers, r), a = new K("camera1", m(0, 0, -1e3), s);
      if (a.setTarget(m()), a.rotation = m(0, 0, Math.PI), a.mode = B.ORTHOGRAPHIC_CAMERA, a.minZ = 0, a.maxZ = 1e5, await rt(s), o.clear(), !e)
        throw new Error("No canvas found", { cause: r });
      return Lt(e);
    }, "Texture render"),
    clear: () => (n.layers.forEach((s) => {
      s?._cached || (s?._texture?.dispose(), s?._mesh?.dispose(), s?._material?.dispose());
    }), n.layers.length = 0, o)
  };
  return o;
}, nt = (t, r) => {
  const e = t.getSize(), n = t.getContext();
  r(n, e), t.update();
}, Ke = (t) => {
  nt(t, (r, e) => {
    const { width: n, height: o } = e;
    r.clearRect(0, 0, n, o);
  });
}, Je = (t, r = "DEBUG IMAGE") => {
  const e = nr.copyToCanvas(t, 1024, 1024);
  e.style.border = "1px solid grey";
  const n = document.createElement("div");
  return n.textContent = r, document.body.appendChild(n), document.body.appendChild(e), new Promise((o, s) => {
    const a = () => {
      e.remove(), n.remove(), o(void 0);
    };
    e.onclick = a, n.onclick = a;
  });
}, Qe = (t, r) => {
  const e = t.getTextureByName(r);
  e && (e.dispose(), t.removeTexture(e));
}, qe = (t, r = {}) => {
  const { color: e = "black" } = r;
  nt(t, (n, o) => {
    const { width: s, height: a } = o;
    n.fillStyle = C.from(e).toString(), n.fillRect(0, 0, s, a);
  });
}, je = (t, r, e = {}) => {
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
  let g = c, f = `${i} ${g}px ${a}`;
  const u = t.getContext();
  u.font = f;
  let d = u.measureText(r);
  g = c / d.width * c, f = `${i} ${g}px ${a}`, u.font = f;
  const p = 0;
  d = u.measureText(r);
  const h = d.fontBoundingBoxAscent ?? 0, x = c - (c - h) / 2;
  u.lineWidth = g / 2;
  const b = {
    x: 0,
    y: x - g,
    width: c,
    height: h * 2
  };
  if (w(n)) {
    u.fillStyle = C.from(n).toString();
    const { x: P, y: W, width: U, height: ot } = b;
    u.fillRect(P, W, U, ot);
  }
  return o && (u.strokeStyle = l, u.strokeText(r, p, x)), u.fillStyle = s, u.fillText(r, p, x), t.hasAlpha = !0, t.update(), b;
}, Nt = {
  linearNearest: I.LINEAR_NEAREST,
  nearestNearest: I.NEAREST_NEAREST,
  linearLinear: I.LINEAR_LINEAR,
  nearestLinear: I.NEAREST_LINEAR
}, D = (t, r, e) => {
  const n = t.getTextureByName(r);
  return w(n) ? n : e();
}, z = (t, r) => {
  const { hasAlpha: e } = r;
  y(e, (n) => {
    t.hasAlpha = n;
  }), t instanceof Q && t.update();
}, tr = (t, r, e = {}) => {
  const n = D(t, r, () => {
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
      Nt[s]
    );
    return l && (l(c.getContext()), c.update()), c;
  });
  return z(n, e), n;
}, _t = (t) => Nt[t], er = (t, r, e) => D(t, r, () => {
  const {
    element: n,
    generateMipMaps: o = !0,
    samplingMode: s = "linearNearest"
  } = e;
  if (!n)
    throw new Error("HTML element is required to create texture", {
      cause: e
    });
  const a = new Vt(r, n, {
    generateMipMaps: o,
    samplingMode: _t(s),
    engine: t.getEngine(),
    scene: t
  });
  return z(a, e), a;
}), rr = (t, r, e) => {
  const n = D(t, r, () => {
    const {
      src: o,
      generateMipMaps: s = !0,
      samplingMode: a = "linearNearest"
    } = e;
    if (!o)
      throw new Error("src is required", { cause: e });
    const i = new I(o, t, {
      samplingMode: _t(a)
    });
    return i.name = r, i;
  });
  return z(n, e), n;
}, nr = {
  builder: Ye,
  copyToCanvas: Lt,
  debugImage: Je,
  getTexture: D,
  getHtmlElementTexture: er,
  getDynamicTexture: tr,
  getPathTexture: rr,
  updateTexture: z,
  imageToTexture: Bt,
  drawTextOnTexture: je,
  drawOnTexture: nt,
  drawBackgroundOnTexture: qe,
  clearTexture: Ke,
  destroyTexture: Qe
}, or = (t, r, e) => {
  const n = t?.effectLayers?.length ? t.getGlowLayerByName(r) : void 0;
  return w(n) ? n : new wt(r, t, e);
}, sr = (t, r, e) => {
  const n = t.getHighlightLayerByName(r);
  return w(n) ? n : new Zt(r, t, e);
}, Fr = {
  getGlowLayer: or,
  getHighlightLayer: sr
}, Dr = {
  getMaterial: k
  // updateMaterial,
  // updateStandardMaterial,
}, ar = (t, r) => {
  const e = t.getTransformNodeByName(r);
  return w(e) ? e : new Xt(r, t);
}, zr = {
  getTransformNode: ar
}, ir = (t) => {
  const r = t.metadata ?? {}, e = r.solidParticleSystems ?? {};
  return w(e) || (t.metadata = {
    ...r,
    solidParticleSystems: {}
  }), e;
}, kt = (t, r, e) => {
  const n = ir(t), o = n[r];
  w(o);
  const s = e();
  return n[r] = s, s;
}, cr = (t, r, e) => kt(t, r, () => new pt(r, t, {
  ...e
})), lr = ({
  sps: t,
  shadowScene: r,
  liveScene: e
}) => {
  const n = It.getPlane(e, "FOO", {
    material: "test",
    width: 1,
    height: 1,
    // depth: 1,
    color: "red"
  });
  n.visibility = 0, t.addShape(n, 1), t.particles.forEach((o, s) => {
    const a = r.meshes[10];
    a.visibility = 0, o.position.copyFrom(a.position), o.rotation.copyFrom(a.rotation), o.scaling.copyFrom(a.scaling);
  }), t.buildMesh(), t.setParticles();
}, Wr = {
  getSolidParticleSystem: cr,
  getParticleSystem: kt,
  buildSpsFromSchadowScene: lr
}, ur = (t, r, e) => new Yt(m(t), m(r), e), dr = (t, r, e = {}) => {
  const {
    trianglePredicate: n,
    fastCheck: o,
    predicate: s = (a) => a.isPickable
  } = e;
  return t.pickWithRay(r, s, o, n);
}, Ur = {
  createRay: ur,
  pickWithRay: dr
}, hr = (t) => new _(t), gr = (t) => {
  t.debugLayer.isVisible() ? t.debugLayer.hide() : t.debugLayer.show();
}, Vr = {
  createScene: hr,
  toggleInspector: gr,
  renderOnce: rt
}, fr = (t) => {
  const r = t.getScene();
  t.dispose(), r.getLightsByTags("shadowCaster").forEach((n) => {
    n.metadata.shadowGenerator.removeShadowCaster(t);
  });
}, mr = (t) => (t.getScene().getLightsByTags("shadowCaster").forEach((n) => {
  n.metadata.shadowGenerator.addShadowCaster(t);
}), () => {
  fr(t);
}), Zr = {
  addShadowToMesh: mr
}, pr = (t, r, e = {}) => {
  const n = new wt(r, t, e);
  return n.neutralColor = new ht(0, 0, 0, 0), n;
}, Xr = {
  addGlowLayer: pr,
  Constants: Kt
};
async function yr(t, r, e) {
  const { atlasSize: n, padding: o = 0 } = e, s = document.createElement("canvas");
  s.width = n, s.height = n;
  const a = s.getContext("2d"), i = {};
  let l = 0, c = 0, g = 0;
  for (const d of r) {
    const p = d.endsWith(".png") ? d : `${d}.png`, h = await wr(`${t}/${p}`), x = h.width + o * 2, b = h.height + o * 2;
    if (l + x > n && (l = 0, c += g, g = 0), c + b > n)
      throw new Error(`Not enough space in atlas for image: ${p}`);
    a.drawImage(h, l + o, c + o), i[p] = {
      frame: {
        x: l + o,
        y: c + o,
        w: h.width,
        h: h.height
      }
    }, l += x, g = Math.max(g, b);
  }
  const f = await new Promise(
    (d) => s.toBlob((p) => d(p), "image/png")
  ), u = new Blob(
    [JSON.stringify({ frames: i }, null, 2)],
    { type: "application/json" }
  );
  return { atlasBlob: f, jsonBlob: u };
}
async function wr(t) {
  return new Promise((r, e) => {
    const n = new Image();
    n.src = t, n.onload = () => r(n), n.onerror = (o) => e(new Error(`Failed to load image: ${t}`));
  });
}
const Ht = (t, r, e = {}) => {
  const n = t?.spriteManagers?.find((u) => u.name === r);
  if (w(n))
    return n;
  const {
    capacity: o = 1,
    cellSize: s,
    imgUrl: a,
    epsilon: i,
    samplingMode: l,
    fromPacked: c,
    spriteJSON: g,
    options: f
  } = e;
  if (!a)
    throw new Error("imgUrl is required", { cause: e });
  return new Jt(
    r,
    a,
    o,
    s,
    t,
    i,
    l,
    c,
    g,
    f
  );
}, xr = (t, r, e) => {
  const n = re(Ht(t, e)), o = n?.sprites?.find((s) => s.name === r);
  return w(o) ? o : new Qt(r, n);
}, Yr = { getSpriteManager: Ht, getSprite: xr, createTextureAtlas: yr }, br = (t, r = {}) => {
  const {
    random: e = bt.globalRandom,
    radius: n = 1,
    maxBounce: o = 0,
    groundZ: s = 0,
    speed: a = 20,
    decay: i = 0.01,
    dispose: l = () => t.isVisible = !1
  } = r;
  {
    const c = t.props?.path;
    if (w(c) && c.length > 0) {
      const g = c.pop();
      if (!g)
        throw new Error("No next value from path", { cause: c });
      t.position = g;
      return;
    }
  }
  {
    const { bounces: c = o } = t.props ?? {};
    if (c <= 0) {
      e() < i && l();
      return;
    }
    const g = c / o, f = t.position, [u, d, p] = L(f), h = (Ft) => (e() * n * 2 - n) * (g / 4) + Ft, [x, b] = [h(u), h(d)], P = m([x, b, s]), [W, U, ot] = L($.midPoint3(f, P)), $t = m(W, U, p - e() * g * 3), Gt = {
      path: qt.CreateCatmullRomSpline([f, $t, P], a).getPoints().reverse(),
      bounces: c - 1
      // rotationAxis: [2 * random() - 1, 2 * random() - 1, 2 * random() - 1],
    }, Ot = t.props ?? {};
    t.props = { ...Ot, ...Gt };
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
const Mr = (t, r, e) => {
  const { XYZI: n, RGBA: o } = r, s = o.map((i) => {
    const { r: l, g: c, b: g, a: f } = i;
    return C.builder({ color: [l, c, g, f], model: "rgba" }).toString();
  }), a = new R(e, t);
  return n.map((i, l) => {
    const c = s[i.i], g = St(t, `voxel-${c}`, {
      color: c,
      material: `voxel-material-${c}`
    });
    return g.position = m(i), g.parent = a, g;
  }), M.AddTagsTo(a, "complex"), a;
}, Tr = (t) => {
  const r = Object.entries(t).sort((e, n) => {
    const [o] = e, [s] = n;
    return o.localeCompare(s);
  });
  return JSON.stringify(r);
}, Cr = (t) => {
  const r = {};
  return t.forEach((e) => {
    const n = e?.material?.name;
    if (!n)
      throw new Error("Mesh material is missing name", { cause: e });
    const o = r[n] ?? [];
    o.push(e), r[n] = o;
  }), r;
}, Er = (t, r, e) => {
  const { XYZI: n, RGBA: o } = r, s = o.map((u) => {
    const { r: d, g: p, b: h, a: x } = u;
    return C.builder({ color: [d, p, h, x], model: "rgba" }).toString();
  }), a = n.map((u, d) => {
    const p = s[u.i], [h, x, b] = L(u), P = Et(
      t,
      `voxel-merged-${p}-${Tr(u)}`,
      {
        position: [h, x, b],
        // color,
        // material: `voxel-merged-material-${color}`,
        material: "voxel-material",
        colors: ee.from(6).map(() => p)
      }
    );
    return P.setEnabled(!1), P;
  }), i = Cr(a), l = Object.values(i).map((u) => Pt(u)), c = new R(`merged-${e}`, t);
  l.filter(w).forEach((u) => u.parent = c);
  const g = k(t, "voxel-material", "standard");
  l.filter(w).forEach((u) => u.material = g), c.metadata = {
    voxels: a
  }, M.AddTagsTo(c, "merged");
  const f = new R(e, t);
  return f.metadata = {
    voxels: a
  }, c.parent = f, f;
}, Kr = {
  animateExplosion: br,
  voxDataToSps: vt,
  voxDataToMergedModel: Er,
  voxDataToComplexModel: Mr
};
export {
  $r as Babs,
  ct as CAMERA_MODES,
  le as Cameras,
  Gr as Engines,
  Fr as Layers,
  he as Lights,
  Dr as Materials,
  It as Meshes,
  Or as Models,
  zr as Nodes,
  Wr as Particles,
  Ur as Rays,
  Vr as Scenes,
  Zr as Shadows,
  Xr as Specials,
  Yr as Sprites,
  nr as Textures,
  Kr as Voxels,
  pr as addGlowLayer
};
