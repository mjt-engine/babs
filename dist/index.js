import { Inputs as j } from "@mjt-engine/input";
import { toVec3 as B, Maths as N, toVec2 as st } from "@mjt-engine/math";
import { Vector3 as F, Texture as R, Color3 as ot, Color4 as at, Engine as Bt, TargetCamera as It, ArcRotateCamera as it, Camera as z, HemisphericLight as ct, PointLight as lt, StandardMaterial as _, PBRMaterial as Nt, Mesh as L, MeshBuilder as E, Matrix as _t, Scene as H, SolidParticleSystem as ut, InstancedMesh as Ht, SceneLoader as tt, DynamicTexture as W, UniversalCamera as Ot, HtmlElementTexture as kt, GlowLayer as dt, HighlightLayer as Gt, TransformNode as Dt, Ray as $t, Constants as Ft, SpriteManager as zt, Sprite as Vt, Curve3 as Ut } from "@babylonjs/core";
import { isDefined as y, iff as m, isUndefined as Z, tuple2 as Wt, tuple3 as Zt, Arrays as Xt } from "@mjt-engine/object";
import { Colors as C } from "@mjt-engine/color";
import { extent as et } from "d3-array";
import { Asserts as ht, assertValue as Yt } from "@mjt-engine/assert";
import { Randoms as gt } from "@mjt-engine/random";
import { Images as Kt } from "@mjt-engine/image";
import "@babylonjs/inspector";
function x(t = 0, r = 0, e = 0) {
  if (typeof t == "number")
    return new F(t, r, e);
  const [n = 0, s = 0, o = 0] = B(t);
  return new F(n, s, o);
}
const ft = (t, r) => {
  const e = t.alpha, n = t.beta, s = t.radius;
  t.target = t.target.add(x(r)), t.radius = s, t.alpha = e, t.beta = n;
}, Jt = (t, r = {}) => {
  const {
    keySensitivity: e = 0.5,
    mouseSensitivity: n = 0.05,
    parent: s = document.body,
    action: o = () => {
    }
  } = r, a = t.alpha, i = t.beta, l = t.radius;
  x(t.target);
  const c = (d = 0, p = 0, h = 0) => {
    ft(t, [d, p, h]), o();
  }, g = j.listenToKey(
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
        t.beta = t.beta + e / 8, o();
      },
      z: () => {
        t.beta = t.beta - e / 8, o();
      },
      c: () => {
        t.alpha = a, t.beta = i, t.radius = l, o();
      },
      "shift+d": () => {
        t.alpha = t.alpha + e / 8, o();
      },
      "shift+a": () => {
        t.alpha = t.alpha - e / 8, o();
      }
    },
    {
      autoUp: !1,
      parent: s
    }
  ), f = {
    lastPosition: void 0
  };
  s.addEventListener("pointerdown", (d) => {
    d.buttons === 4 && (f.lastPosition = d);
  }), s.addEventListener("pointermove", (d) => {
    if (d.buttons !== 4)
      return;
    const { lastPosition: p = d } = f;
    f.lastPosition = d;
    const h = N.subtract2(p, d), [w, b] = st(h);
    if (d.buttons === 4 && d.shiftKey) {
      t.beta = t.beta + b * n;
      return;
    }
    d.buttons === 4 && (c(b * n, -b * n, 0), c(w * n, w * n, 0));
  });
  const u = j.listenToMouse(
    {
      wheel: (d) => {
        if (d instanceof WheelEvent) {
          const p = d.deltaY * n;
          t.radius += p, o();
        }
      }
    },
    {
      parent: s
    }
  );
  return [g, u];
}, mt = (t, r = /.*/, e = 0) => {
  const n = "".padStart(e * 2);
  if (r.test(t.name)) {
    console.log(`${n}mesh: '${t.name}'`);
    const s = t.material;
    y(s) && Object.entries(s).filter(
      (a) => /.Texture$/.test(a[0])
    ).map((a) => {
      const [i, l] = a;
      l instanceof R && i !== "_environmentBRDFTexture" && console.log(`${n}tex: '${l.name}' (${i})`);
    });
  }
  t.getChildMeshes().map((s) => mt(s, r, e + 1));
}, M = (t) => {
  const r = C.builder({ color: t }).hex();
  return ot.FromHexString(r);
}, O = (t) => {
  const r = C.builder({ color: t }), e = at.FromHexString(r.hex());
  return e.a = r.alpha(), e;
}, pt = ({
  width: t = 320,
  height: r = 320
}) => {
  const e = document.createElement("canvas");
  return e.width = t, e.height = r, e;
}, X = (t = {}) => {
  const {
    width: r = 320,
    height: e = 320,
    antialias: n,
    canvas: s = pt({ width: r, height: e })
  } = t, o = new Bt(s, n, {
    powerPreference: "high-performance",
    ...t
  });
  return o.hideLoadingUI(), o;
}, Qt = (t, r, e) => {
  const n = t.getCameraByName(r);
  return y(n) ? n : e();
}, qt = (t, r) => {
  const {
    alpha: e,
    beta: n,
    radius: s,
    target: o,
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
  m(a, (h) => {
    t.position = x(h);
  }), m(l, (h) => {
    t.minZ = h;
  }), m(c, (h) => {
    t.maxZ = h;
  }), m(g, (h) => {
    t.mode = rt[h];
  }), m(g, (h) => {
    t.mode = rt[h];
  }), m(f, (h) => {
    t.orthoTop = h;
  }), m(u, (h) => {
    t.orthoBottom = h;
  }), m(d, (h) => {
    t.orthoLeft = h;
  }), m(p, (h) => {
    t.orthoRight = h;
  }), t instanceof It && (m(i, (h) => {
    t.rotation = x(h);
  }), m(o, (h) => {
    t.target = x(h);
  })), t instanceof it && (m(e, (h) => {
    t.alpha = h;
  }), m(n, (h) => {
    t.alpha = h;
  }), m(s, (h) => {
    t.radius = h;
  }));
}, jt = (t, r, e = {}) => {
  const n = Qt(t, r, () => {
    const { alpha: s = 0, beta: o = 0, radius: a = 2, target: i } = e;
    return new it(r, s, o, a, x(i), t);
  });
  return qt(n, e), n;
}, rt = {
  orthographic: z.ORTHOGRAPHIC_CAMERA,
  perspective: z.PERSPECTIVE_CAMERA
}, te = {
  getArcRotateCamera: jt
  // getCamera,
  // updateCamera,
  // getUniversalCamera,
  // attachArcRotateCameraControls,
  // attachUniversalCameraControls,
  // createTopDownCamera,
  // createDebugCamera,
}, Y = (t, r, e) => {
  const n = t.getLightByName(r);
  return y(n) ? n : e();
}, K = (t, r) => {
  const { intensity: e, direction: n, position: s } = r;
  m(e, (o) => {
    t.intensity = o;
  }), t instanceof ct && m(n, (o) => {
    t.direction = x(o);
  }), t instanceof lt && m(s, (o) => {
    t.position = x(o);
  });
}, ee = (t, r, e = {}) => {
  const n = Y(t, r, () => {
    const { direction: s } = e;
    return new ct(r, x(s), t);
  });
  return K(n, e), n;
}, re = (t, r, e = {}) => {
  const n = Y(t, r, () => {
    const { position: s } = e;
    return new lt(r, x(s), t);
  });
  return K(n, e), n;
}, ne = {
  getLight: Y,
  getHemisphericLight: ee,
  getPointLight: re,
  updateLight: K
}, S = (t, r, e, n = !1) => {
  const s = t.getMeshByName(r);
  return y(s) && !n ? s : y(s) && n ? e(s) : e();
}, se = (t, r, e) => {
  const {
    alpha: n,
    diffuseTexture: s,
    emissiveTexture: o,
    ambientTexture: a,
    opacityTexture: i,
    diffuseColor: l,
    specularColor: c,
    ambientColor: g,
    emissiveColor: f
  } = e;
  m(s, (u) => {
    const d = t.getTextureByName(u);
    r.diffuseTexture = d;
  }), m(o, (u) => {
    const d = t.getTextureByName(u);
    r.emissiveTexture = d;
  }), m(a, (u) => {
    const d = t.getTextureByName(u);
    r.ambientTexture = d;
  }), m(i, (u) => {
    const d = t.getTextureByName(u);
    r.opacityTexture = d;
  }), m(l, (u) => {
    r.diffuseColor = M(u);
    const d = C.from(u).alpha();
    d < 1 && (r.alpha = d);
  }), m(c, (u) => {
    r.specularColor = M(u);
  }), m(g, (u) => {
    r.ambientColor = M(u);
  }), m(f, (u) => {
    r.specularColor = M(u);
  }), m(n, (u) => {
    r.alpha = u;
  });
}, nt = (t, r, e) => {
  r instanceof _ && se(t, r, e);
}, I = (t, r, e = "standard") => {
  const n = t.getMaterialByName(r);
  if (y(n))
    return n;
  const s = typeof e == "string" ? e : e?.type ?? "standard";
  switch (s) {
    case "standard": {
      const o = new _(r, t);
      return nt(t, o, e), o;
    }
    case "pbr": {
      const o = new Nt(r, t);
      return nt(t, o, e), o;
    }
    default:
      throw new Error(`Unknown material type: '${s}'`);
  }
}, v = (t, r, e) => {
  const { position: n, color: s, material: o, receiveShadows: a } = e;
  r instanceof L && y(o) && (r.material = I(t, o, "standard")), r instanceof L && y(a) && (r.receiveShadows = a), m(n, (i) => {
    r.position = x(i);
  }), m(s, (i) => {
    const l = r.material;
    if (l instanceof _) {
      l.diffuseColor = M(i);
      const c = C.from(i).alpha();
      c < 1 && (l.alpha = c), l.specularColor = M("black"), l.ambientColor = M(i), l.emissiveColor = M(i);
    }
  });
}, yt = (t, r, e = {}) => S(t, r, () => {
  const { width: n = 1, height: s = 1, depth: o = 1, colors: a } = e, i = E.CreateBox(
    r,
    {
      width: n,
      height: s,
      depth: o,
      faceColors: y(a) ? a.map(O) : void 0
    },
    t
  );
  return v(t, i, e), i;
}), xt = (t, r, e) => {
  const {
    width: n = 1,
    height: s = 1,
    depth: o = 1,
    material: a,
    receiveShadows: i = !1
  } = e, l = `box-instance-root-${JSON.stringify([
    n,
    s,
    o,
    a,
    i
  ])}`;
  let c = t.getMeshByName(l);
  if (Z(c)) {
    if (c = E.CreateBox(l, { width: n, height: s, depth: o }, t), c.receiveShadows = i, c.isVisible = !1, !a)
      throw new Error("No material", { cause: e });
    c.material = I(t, a, "standard");
  }
  const g = c.createInstance(r);
  return v(t, g, e), g;
}, oe = (t, r, e) => {
  const { radius: n = 0.5 } = e;
  return S(t, r, () => {
    const s = E.CreateSphere(
      r,
      { diameter: n * 2 },
      t
    );
    return v(t, s, e), s;
  });
}, ae = (t, r, e, n = {}) => {
  const {
    predicate: s = (l) => l.isPickable,
    camera: o = t.activeCamera
  } = n, a = t.createPickingRay(r, e, _t.Identity(), o);
  return t.pickWithRay(a, s)?.pickedMesh;
}, ie = (t) => {
  t.computeWorldMatrix(!0), t.refreshBoundingInfo({});
  const [r, e, n] = B(t.getAbsolutePosition()), s = t.getBoundingInfo().boundingSphere.radius;
  return [r, e, n - s];
}, V = (t, r) => {
  if (t instanceof H)
    return t.meshes.forEach((e) => V(e, r));
  r(t), t.getChildMeshes().forEach((e) => V(e, r));
}, ce = {
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
}, le = (t, r, e = {}) => S(t, r, () => {
  const { size: n = 1, type: s = "tetrahedron" } = e, o = E.CreatePolyhedron(
    r,
    { type: ce[s], size: n },
    t
  );
  return v(t, o, e), o;
}), ue = (t) => {
  const r = t.getBoundingInfo().boundingBox.vectors, e = t.getScene(), n = e.getEngine().getRenderingCanvas();
  if (!n)
    throw new Error("No canvas for scene", { cause: e });
  const s = t.getWorldMatrix(), o = e.getTransformMatrix(), a = e.activeCamera.viewport, i = r.map((d) => {
    const p = F.Project(d, s, o, a);
    return p.x = p.x * n.clientWidth, p.y = p.y * n.clientHeight, p;
  }), [l, c] = et(i, (d) => d.x), [g, f] = et(i, (d) => d.y);
  return {
    width: c - l,
    height: f - g,
    left: l,
    top: g,
    right: c,
    bottom: f
  };
}, de = (t, r, e = {}) => {
  const {
    recurse: n = !0,
    disposeMaterials: s = !1,
    disposeTextures: o = !1
  } = e, a = t.getMeshByName(r);
  if (a) {
    if (a.dispose(!n, !1), s) {
      const i = a.material;
      if (!i)
        return;
      i.name = `DISPOSED-${i.name}`, i?.dispose(!0, o), t.removeMaterial(i);
    }
    t.removeMesh(a);
  }
}, he = (t) => {
  if (!Z(t))
    return t.sort((r, e) => r.distance - e.distance), t[0];
}, ge = (t, r, e = {}) => S(t, r, () => {
  const { arc: n = 1, height: s = 1, radius: o = 0.5, tag: a } = e, i = E.CreateCylinder(
    r,
    {
      height: s,
      arc: n,
      diameter: o * 2
    },
    t
  );
  return v(t, i, e), i;
}), fe = (t, r, e) => {
  const { updatable: n = !1 } = e;
  return S(
    t,
    r,
    (s) => me(t, r, {
      ...e,
      instance: s
      // updatable: undefined,
    }),
    n
  );
}, me = (t, r, e) => {
  const {
    colors: n = [],
    points: s = [],
    color: o = "white",
    updatable: a = !1,
    useVertexAlpha: i,
    instance: l
  } = e, c = s.map((u, d) => n[d] ?? o).map((u) => O(u)), g = s.map((u) => x(u)), f = E.CreateLines(r, {
    points: g,
    colors: c,
    updatable: a,
    useVertexAlpha: i,
    instance: l
  });
  return v(t, f, e), f;
}, U = (t, r, e) => {
  const n = t.getMeshByName(r);
  return y(n) ? Promise.resolve(n) : e();
}, pe = (t, r, e, n) => S(t, r, () => {
  const s = S(t, e, n);
  return ht.assertValue(s, () => (console.log({ scene: t, name: r, rootName: e, producer: n }), "Unable to create mesh instance. Missing root mesh.")), s.createInstance(r);
}), ye = async (t, r, e, n) => U(t, r, async () => {
  const s = await U(t, e, n);
  return ht.assertValue(s, () => (console.log({ scene: t, name: r, rootName: e, producer: n }), "Unable to create mesh instance. Missing root mesh.")), s.createInstance(r);
}), xe = (t, r, e = {}) => S(t, r, () => {
  const { width: n = 1, height: s = 1, tag: o } = e, a = E.CreatePlane(
    r,
    {
      width: n,
      height: s
    },
    t
  ), { billboard: i } = e;
  return i && (a.billboardMode = L.BILLBOARDMODE_ALL), v(t, a, e), a;
}), we = (t, r, e = {}) => S(t, r, () => {
  const { radius: n = 0.5 } = e, s = E.CreateTorusKnot(r, { radius: n }, t);
  return v(t, s, e), s;
}), Te = (t) => {
  const { XYZI: r, SIZE: e } = t, n = e.z, s = 1 / n / 2, o = 1 / n / 2, a = 1 / n / 2;
  return r.map((i) => {
    const [l, c, g] = B(i), f = (l - e.x / 2) / n + s, u = (c - e.y / 2) / n + o, d = (g - e.z / 2) / -n - a;
    return Wt(Zt(f, u, d), i.i);
  });
}, wt = (t, r, e) => {
  const { XYZI: n, RGBA: s, SIZE: o } = r, a = s.map((f) => {
    const { r: u, g: d, b: p, a: h } = f;
    return C.builder({ color: [u, d, p, h], model: "rgba" }).toString();
  }), i = new ut(e, t), l = 1 / o.z, c = E.CreateBox("temp-box", {
    width: l,
    height: l,
    depth: l
  });
  i.addShape(c, n.length), i.buildMesh(), c.dispose(), Te(r).forEach((f, u) => {
    const [d, p] = f, h = i.particles[u];
    h.position = x(d);
    const w = a[p];
    h.color = O(w);
  });
  const g = I(t, "vox-material", "standard");
  return g.specularColor = M("black"), i.mesh.material = g, i.setParticles(), i;
}, Me = (t, r, e, n = {}) => {
  const s = t.metadata ?? {}, { voxes: o = {} } = s, a = o[e];
  if (Z(a))
    throw console.log({ scene: t, name: r, src: e }), new Error(`No voxData found for ${e} ${r}`);
  const i = wt(t, a, r), l = i.mesh;
  return v(t, l, n), i;
}, be = (t) => t instanceof Ht, Ce = (t, r) => {
  const [e, n] = st(N.normalize2(N.subtract2(r, t)));
  return Math.atan2(n, e) + Math.PI / 2;
}, Tt = (t, r = {}) => {
  const {
    disposeSource: e = !1,
    allow32BitsIndices: n = !0,
    meshSubclass: s = void 0,
    subdivideWithSubMeshes: o = !1,
    multiMultiMaterials: a = !1
  } = r;
  return L.MergeMeshes(
    t,
    e,
    n,
    s,
    o,
    a
  );
}, Se = (t, r, e, n = {}) => {
  const {
    predicate: s = (a) => a.isPickable,
    camera: o = t.activeCamera
  } = n;
  if (!o)
    throw new Error("Camera required");
  return t.multiPick(r, e, s, o);
}, Ee = {
  lookAt: Ce,
  getBox: yt,
  getPlane: xe,
  getBoxInstance: xt,
  getSphere: oe,
  getCylinder: ge,
  getTorusKnot: we,
  getLine: fe,
  walkMeshes: V,
  pickMesh: ae,
  getMesh: S,
  getMeshAsync: U,
  calcTopOfMeshWorldPosition: ie,
  mergeMeshes: Tt,
  getVoxModel: Me,
  calcClientRectForMesh: ue,
  updateArcRotateCameraPosition: ft,
  findClosestPick: he,
  destroyMesh: de,
  getMeshInstance: pe,
  getMeshInstanceAsync: ye,
  isInstancedMesh: be,
  pickMeshes: Se,
  getPolyhedron: le,
  updateMesh: v
}, ve = (t = X()) => {
  const r = new H(t), e = t.getRenderingCanvas();
  te.getArcRotateCamera(r, "Camera", {}).attachControl(e, !0), ne.getHemisphericLight(r, "light1", {
    direction: [1, 1, 1]
  }), Ee.getSphere(r, "sphere", {
    radius: 0.5
  });
  const s = { debug: !1 };
  return e.onkeyup = (o) => {
    o.ctrlKey && o.keyCode === 73 && (s.debug = !s.debug, s.debug ? r.debugLayer.hide() : (console.log("SHOW!"), r.debugLayer.show()));
  }, t.runRenderLoop(() => {
    r.render();
  }), r;
}, Pe = (t) => (r) => {
};
async function Ae(t, r = t.name) {
  return await t();
}
const J = (t) => {
  const r = Pe();
  return new Promise((e, n) => {
    try {
      t.onAfterRenderCameraObservable.addOnce(() => {
        r(), e();
      }), t.render(!0);
    } catch (s) {
      n(s);
    }
  });
}, Sr = {
  createEngine: X,
  createCanvas: pt,
  renderOnce: J,
  v3: x,
  c3: M,
  c4: O,
  describeMesh: mt,
  helloWorld: ve,
  attachEditorControls: Jt
}, Re = (t) => {
  console.log("fixing eyelashes", t.meshes), t.meshes.forEach((r) => {
    if (r.name.includes("Eyelashes") && (console.log("fixing eyelashes", r.name), r.name.includes("primitive1"))) {
      console.log("fixing eyelashes: primitive1", r.name);
      const e = r.material;
      if (!e)
        throw new Error("Mesh has no material", { cause: r });
      const n = e.getActiveTextures()[0];
      n.hasAlpha = !0, n.getAlphaFromRGB = !0, e.transparencyMode = 1, e.opacityTexture = n, r.visibility = 0.5, e.albedoColor = new ot(0, 0, 0);
    }
  });
}, Le = [
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
], Be = [
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
], Mt = (t) => {
  const r = t?.material?.getActiveTextures() ?? [];
  if (y(
    r.find((e) => {
      const n = e?.name;
      return y(Le.find((s) => n.includes(s)));
    })
  ) && (t.visibility = 0), y(
    r.find((e) => {
      const n = e?.name;
      return y(Be.find((s) => n.includes(s)));
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
  t.getChildMeshes().map(Mt);
}, Ie = (t) => {
  console.log("fixing bump maps", t.meshes), t.meshes.forEach((r) => {
    const e = r.material;
    e && (e.bumpTexture = null);
  });
}, Ne = (t) => {
  Re(t), t.meshes.map(Mt), Ie(t);
}, _e = (t) => {
  const { path: r, scene: e, name: n = r instanceof File ? r.name : r } = t;
  return e.getEngine().hideLoadingUI(), new Promise((o, a) => {
    try {
      tt.ShowLoadingScreen = !1, tt.Append(
        "",
        r,
        e,
        (i) => {
          const l = i.getMeshByName("__root__");
          if (!l)
            throw new Error("No root mesh found", { cause: i });
          l.name = n, i.cameras.length > 0 && (i.activeCamera = i.cameras[0]), i.animationGroups.forEach((c) => {
            c.stop();
          }), Ne(i), o(l);
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
}, Er = {
  renderOnce: J,
  loadDazFigure: _e
  // fixDazFigure,
  // loadAssetContainer,
  // builder,
}, bt = (t, r = t.width, e = t.height) => {
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
}, He = async (t) => {
  if (typeof t == "string")
    return t;
  const r = document.createElement("canvas");
  return r.width = t.width, r.height = t.height, r.getContext("2d").drawImage(t, 0, 0), await Kt.toSrcString(r);
}, Ct = async (t, r, e) => {
  if (e instanceof HTMLCanvasElement)
    return new Promise((s, o) => {
      try {
        const a = new W(r, e, t);
        a.update(), a.hasAlpha = !0, s(a);
      } catch (a) {
        o(a);
      }
    });
  const n = await He(e);
  return new Promise((s, o) => {
    try {
      const a = new R(n, t, !1, !0);
      a.hasAlpha = !0, a.onLoadObservable.addOnce(() => {
        s(a);
      });
    } catch (a) {
      o(a);
    }
  });
}, Oe = async (t, r) => {
  const e = gt.randomUuid(), { size: n, image: s, color: o } = t, a = E.CreatePlane(
    `plane-${e}`,
    {
      width: n,
      height: n
    },
    r
  ), i = new _(`material-${e}`, r);
  if (y(s)) {
    const l = await Ct(r, `layer-${e}`, s);
    t._texture = l, t._mesh = a, t._material = i, l.hasAlpha = !0, i.opacityTexture = l, i.emissiveTexture = l;
  }
  return y(o) && (i.emissiveColor = M(o)), a.material = i, a;
}, ke = async (t, r) => {
  const e = new H(r);
  return await Promise.all(
    t.map(async (n, s) => {
      const o = await Oe(n, e);
      return o.position.set(0, 0, -s), o;
    })
  ), e;
}, Ge = ({ size: t } = { size: 4096 }) => {
  const r = X({ width: t, height: t }), e = r.getRenderingCanvas(), n = {
    layers: []
  }, s = {
    addLayer: (o) => (n.layers.push({ size: t, ...o }), s),
    render: async () => Ae(async () => {
      const o = await ke(n.layers, r), a = new Ot("camera1", x(0, 0, -1e3), o);
      if (a.setTarget(x()), a.rotation = x(0, 0, Math.PI), a.mode = z.ORTHOGRAPHIC_CAMERA, a.minZ = 0, a.maxZ = 1e5, await J(o), s.clear(), !e)
        throw new Error("No canvas found", { cause: r });
      return bt(e);
    }, "Texture render"),
    clear: () => (n.layers.forEach((o) => {
      o?._cached || (o?._texture?.dispose(), o?._mesh?.dispose(), o?._material?.dispose());
    }), n.layers.length = 0, s)
  };
  return s;
}, Q = (t, r) => {
  const e = t.getSize(), n = t.getContext();
  r(n, e), t.update();
}, De = (t) => {
  Q(t, (r, e) => {
    const { width: n, height: s } = e;
    r.clearRect(0, 0, n, s);
  });
}, $e = (t, r = "DEBUG IMAGE") => {
  const e = Xe.copyToCanvas(t, 1024, 1024);
  e.style.border = "1px solid grey";
  const n = document.createElement("div");
  return n.textContent = r, document.body.appendChild(n), document.body.appendChild(e), new Promise((s, o) => {
    const a = () => {
      e.remove(), n.remove(), s(void 0);
    };
    e.onclick = a, n.onclick = a;
  });
}, Fe = (t, r) => {
  const e = t.getTextureByName(r);
  e && (e.dispose(), t.removeTexture(e));
}, ze = (t, r = {}) => {
  const { color: e = "black" } = r;
  Q(t, (n, s) => {
    const { width: o, height: a } = s;
    n.fillStyle = C.from(e).toString(), n.fillRect(0, 0, o, a);
  });
}, Ve = (t, r, e = {}) => {
  const {
    backgroundColor: n,
    outline: s = !0,
    color: o = "black",
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
  const h = d.fontBoundingBoxAscent ?? 0, w = c - (c - h) / 2;
  u.lineWidth = g / 2;
  const b = {
    x: 0,
    y: w - g,
    width: c,
    height: h * 2
  };
  if (y(n)) {
    u.fillStyle = C.from(n).toString();
    const { x: P, y: D, width: $, height: q } = b;
    u.fillRect(P, D, $, q);
  }
  return s && (u.strokeStyle = l, u.strokeText(r, p, w)), u.fillStyle = o, u.fillText(r, p, w), t.hasAlpha = !0, t.update(), b;
}, St = {
  linearNearest: R.LINEAR_NEAREST,
  nearestNearest: R.NEAREST_NEAREST,
  linearLinear: R.LINEAR_LINEAR,
  nearestLinear: R.NEAREST_LINEAR
}, k = (t, r, e) => {
  const n = t.getTextureByName(r);
  return y(n) ? n : e();
}, G = (t, r) => {
  const { hasAlpha: e } = r;
  m(e, (n) => {
    t.hasAlpha = n;
  }), t instanceof W && t.update();
}, Ue = (t, r, e = {}) => {
  const n = k(t, r, () => {
    const {
      generateMipMaps: s = !0,
      samplingMode: o = "linearNearest",
      width: a = 1024,
      height: i = 1024,
      init: l
    } = e, c = new W(
      r,
      {
        width: a,
        height: i
      },
      t,
      s,
      St[o]
    );
    return l && (l(c.getContext()), c.update()), c;
  });
  return G(n, e), n;
}, Et = (t) => St[t], We = (t, r, e) => k(t, r, () => {
  const {
    element: n,
    generateMipMaps: s = !0,
    samplingMode: o = "linearNearest"
  } = e;
  if (!n)
    throw new Error("HTML element is required to create texture", {
      cause: e
    });
  const a = new kt(r, n, {
    generateMipMaps: s,
    samplingMode: Et(o),
    engine: t.getEngine(),
    scene: t
  });
  return G(a, e), a;
}), Ze = (t, r, e) => {
  const n = k(t, r, () => {
    const {
      src: s,
      generateMipMaps: o = !0,
      samplingMode: a = "linearNearest"
    } = e;
    if (!s)
      throw new Error("src is required", { cause: e });
    const i = new R(s, t, {
      samplingMode: Et(a)
    });
    return i.name = r, i;
  });
  return G(n, e), n;
}, Xe = {
  builder: Ge,
  copyToCanvas: bt,
  debugImage: $e,
  getTexture: k,
  getHtmlElementTexture: We,
  getDynamicTexture: Ue,
  getPathTexture: Ze,
  updateTexture: G,
  imageToTexture: Ct,
  drawTextOnTexture: Ve,
  drawOnTexture: Q,
  drawBackgroundOnTexture: ze,
  clearTexture: De,
  destroyTexture: Fe
}, Ye = (t, r, e) => {
  const n = t?.effectLayers?.length ? t.getGlowLayerByName(r) : void 0;
  return y(n) ? n : new dt(r, t, e);
}, Ke = (t, r, e) => {
  const n = t.getHighlightLayerByName(r);
  return y(n) ? n : new Gt(r, t, e);
}, vr = {
  getGlowLayer: Ye,
  getHighlightLayer: Ke
}, Pr = {
  getMaterial: I
  // updateMaterial,
  // updateStandardMaterial,
}, Je = (t, r) => {
  const e = t.getTransformNodeByName(r);
  return y(e) ? e : new Dt(r, t);
}, Ar = {
  getTransformNode: Je
}, Qe = (t, r, e) => {
  const s = (t.metadata ?? {}).solidParticleSystems?.[r];
  return y(s), e();
}, qe = (t, r, e = {}) => Qe(t, r, () => {
  const { useModelMaterial: n = !1 } = e, s = new ut(r, t, {
    useModelMaterial: n
  }), o = t.metadata ?? {};
  t.metadata = o;
  const a = o.solidParticleSystems ?? {};
  return o.solidParticleSystems = a, a[r] = s, s;
}), Rr = { getSolidParticleSystem: qe }, je = (t, r, e) => new $t(x(t), x(r), e), tr = (t, r, e = {}) => {
  const {
    trianglePredicate: n,
    fastCheck: s,
    predicate: o = (a) => a.isPickable
  } = e;
  return t.pickWithRay(r, o, s, n);
}, Lr = {
  createRay: je,
  pickWithRay: tr
}, er = (t) => {
  t.debugLayer.isVisible() ? t.debugLayer.hide() : t.debugLayer.show();
}, rr = (t) => new H(t), Br = {
  createScene: rr,
  toggleInspector: er
}, nr = (t) => {
  const r = t.getScene();
  t.dispose(), r.getLightsByTags("shadowCaster").forEach((n) => {
    n.metadata.shadowGenerator.removeShadowCaster(t);
  });
}, sr = (t) => (t.getScene().getLightsByTags("shadowCaster").forEach((n) => {
  n.metadata.shadowGenerator.addShadowCaster(t);
}), () => {
  nr(t);
}), Ir = {
  addShadowToMesh: sr
}, or = (t, r, e = {}) => {
  const n = new dt(r, t, e);
  return n.neutralColor = new at(0, 0, 0, 0), n;
}, Nr = {
  addGlowLayer: or,
  Constants: Ft
}, vt = (t, r, e = {}) => {
  const n = t?.spriteManagers?.find((i) => i.name === r);
  if (y(n))
    return n;
  const { capacity: s = 1, cellSize: o, imgUrl: a } = e;
  if (!a)
    throw new Error("imgUrl is required", { cause: e });
  return new zt(r, a, s, o, t);
}, ar = (t, r, e) => {
  const n = Yt(vt(t, e)), s = n?.sprites?.find((o) => o.name === r);
  return y(s) ? s : new Vt(r, n);
}, _r = { getSpriteManager: vt, getSprite: ar }, ir = (t, r = {}) => {
  const {
    random: e = gt.globalRandom,
    radius: n = 1,
    maxBounce: s = 0,
    groundZ: o = 0,
    speed: a = 20,
    decay: i = 0.01,
    dispose: l = () => t.isVisible = !1
  } = r;
  {
    const c = t.props?.path;
    if (y(c) && c.length > 0) {
      const g = c.pop();
      if (!g)
        throw new Error("No next value from path", { cause: c });
      t.position = g;
      return;
    }
  }
  {
    const { bounces: c = s } = t.props ?? {};
    if (c <= 0) {
      e() < i && l();
      return;
    }
    const g = c / s, f = t.position, [u, d, p] = B(f), h = (Lt) => (e() * n * 2 - n) * (g / 4) + Lt, [w, b] = [h(u), h(d)], P = x([w, b, o]), [D, $, q] = B(N.midPoint3(f, P)), Pt = x(D, $, p - e() * g * 3), At = {
      path: Ut.CreateCatmullRomSpline([f, Pt, P], a).getPoints().reverse(),
      bounces: c - 1
      // rotationAxis: [2 * random() - 1, 2 * random() - 1, 2 * random() - 1],
    }, Rt = t.props ?? {};
    t.props = { ...Rt, ...At };
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
    e = e || ((o) => o === "true");
    let n;
    const s = r.split("||");
    for (const o in s)
      if (Object.prototype.hasOwnProperty.call(s, o)) {
        let a = A._SimplifyNegation(s[o].trim());
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
      for (const s in r._tags)
        Object.prototype.hasOwnProperty.call(r._tags, s) && r._tags[s] === !0 && n.push(s);
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
    e.split(" ").forEach(function(s) {
      T._AddTagTo(r, s);
    });
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
    for (const s in n)
      T._RemoveTagFrom(r, n[s]);
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
const cr = (t, r, e) => {
  const { XYZI: n, RGBA: s } = r, o = s.map((i) => {
    const { r: l, g: c, b: g, a: f } = i;
    return C.builder({ color: [l, c, g, f], model: "rgba" }).toString();
  }), a = new L(e, t);
  return n.map((i, l) => {
    const c = o[i.i], g = xt(t, `voxel-${c}`, {
      color: c,
      material: `voxel-material-${c}`
    });
    return g.position = x(i), g.parent = a, g;
  }), T.AddTagsTo(a, "complex"), a;
}, lr = (t) => {
  const r = Object.entries(t).sort((e, n) => {
    const [s] = e, [o] = n;
    return s.localeCompare(o);
  });
  return JSON.stringify(r);
}, ur = (t) => {
  const r = {};
  return t.forEach((e) => {
    const n = e?.material?.name;
    if (!n)
      throw new Error("Mesh material is missing name", { cause: e });
    const s = r[n] ?? [];
    s.push(e), r[n] = s;
  }), r;
}, dr = (t, r, e) => {
  const { XYZI: n, RGBA: s } = r, o = s.map((u) => {
    const { r: d, g: p, b: h, a: w } = u;
    return C.builder({ color: [d, p, h, w], model: "rgba" }).toString();
  }), a = n.map((u, d) => {
    const p = o[u.i], [h, w, b] = B(u), P = yt(
      t,
      `voxel-merged-${p}-${lr(u)}`,
      {
        position: [h, w, b],
        // color,
        // material: `voxel-merged-material-${color}`,
        material: "voxel-material",
        colors: Xt.from(6).map(() => p)
      }
    );
    return P.setEnabled(!1), P;
  }), i = ur(a), l = Object.values(i).map((u) => Tt(u)), c = new L(`merged-${e}`, t);
  l.filter(y).forEach((u) => u.parent = c);
  const g = I(t, "voxel-material", "standard");
  l.filter(y).forEach((u) => u.material = g), c.metadata = {
    voxels: a
  }, T.AddTagsTo(c, "merged");
  const f = new L(e, t);
  return f.metadata = {
    voxels: a
  }, c.parent = f, f;
}, Hr = {
  animateExplosion: ir,
  voxDataToSps: wt,
  voxDataToMergedModel: dr,
  voxDataToComplexModel: cr
};
export {
  Sr as Babs,
  rt as CAMERA_MODES,
  te as Cameras,
  vr as Layers,
  ne as Lights,
  Pr as Materials,
  Ee as Meshes,
  Er as Models,
  Ar as Nodes,
  Rr as Particles,
  Lr as Rays,
  Br as Scenes,
  Ir as Shadows,
  Nr as Specials,
  _r as Sprites,
  Xe as Textures,
  Hr as Voxels,
  or as addGlowLayer,
  rr as createScene,
  Qe as getParticleSystem,
  qe as getSolidParticleSystem,
  ar as getSprite,
  vt as getSpriteManager
};
