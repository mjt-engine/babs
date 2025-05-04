import { Inputs as $ } from "@mjt-engine/input";
import { toVec3 as k, Maths as F, toVec2 as fe } from "@mjt-engine/math";
import * as b from "@babylonjs/core";
import { Vector3 as Y, Engine as Ze, Color3 as pe, Color4 as Q, Matrix as me, Scene as H, UniversalCamera as q, Camera as O, TargetCamera as Ye, ArcRotateCamera as j, HemisphericLight as ye, PointLight as xe, StandardMaterial as U, PBRMaterial as Xe, Mesh as I, MeshBuilder as v, SolidParticleSystem as ee, InstancedMesh as Ke, Texture as L, WebGPUEngine as we, SceneLoader as le, DynamicTexture as te, HtmlElementTexture as Je, GlowLayer as Me, HighlightLayer as Qe, TransformNode as qe, Ray as je, Constants as et, SpritePackedManager as tt, SpriteManager as rt, Sprite as nt, Curve3 as ot } from "@babylonjs/core";
import { Colors as E } from "@mjt-engine/color";
import { isUndefined as N, isDefined as x, iff as w, tuple2 as at, tuple3 as st, Arrays as it } from "@mjt-engine/object";
import { extent as ue } from "d3-array";
import { Asserts as _, assertValue as ct } from "@mjt-engine/assert";
import { Randoms as be } from "@mjt-engine/random";
import { Images as lt } from "@mjt-engine/image";
import "@babylonjs/inspector";
import { Noises as ut } from "@mjt-engine/noise";
function y(e = 0, r = 0, t = 0) {
  if (typeof e == "number")
    return new Y(e, r, t);
  const [n = 0, o = 0, a = 0] = k(e);
  return new Y(n, o, a);
}
const Te = (e, r) => {
  const t = e.alpha, n = e.beta, o = e.radius;
  e.target = e.target.add(y(r)), e.radius = o, e.alpha = t, e.beta = n;
}, Ce = (e, r = {}) => {
  const {
    keySensitivity: t = 0.5,
    mouseSensitivity: n = 0.05,
    parent: o = document.body,
    action: a = () => {
    }
  } = r, s = e.alpha, i = e.beta, l = e.radius;
  y(e.target);
  const c = (h = 0, u = 0, g = 0) => {
    Te(e, [h, u, g]), a();
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
        e.beta = e.beta + t / 8, a();
      },
      z: () => {
        e.beta = e.beta - t / 8, a();
      },
      c: () => {
        e.alpha = s, e.beta = i, e.radius = l, a();
      },
      "shift+d": () => {
        e.alpha = e.alpha + t / 8, a();
      },
      "shift+a": () => {
        e.alpha = e.alpha - t / 8, a();
      }
    },
    {
      autoUp: !1,
      parent: o
    }
  ), f = {
    lastPosition: void 0
  };
  o.addEventListener("pointerdown", (h) => {
    h.buttons === 4 && (f.lastPosition = h);
  }), o.addEventListener("pointermove", (h) => {
    if (h.buttons !== 4)
      return;
    const { lastPosition: u = h } = f;
    f.lastPosition = h;
    const g = F.subtract2(u, h), [m, M] = fe(g);
    if (h.buttons === 4 && h.shiftKey) {
      e.beta = e.beta + M * n;
      return;
    }
    h.buttons === 4 && (c(M * n, -M * n, 0), c(m * n, m * n, 0));
  });
  const d = $.listenToMouse(
    {
      wheel: (h) => {
        if (h instanceof WheelEvent) {
          const u = h.deltaY * n;
          e.radius += u, a();
        }
      }
    },
    {
      parent: o
    }
  );
  return [p, d];
}, Se = ({
  width: e = 320,
  height: r = 320
}) => {
  const t = document.createElement("canvas");
  return t.width = e, t.height = r, t;
}, G = (e) => {
  const r = e instanceof HTMLCanvasElement || e instanceof OffscreenCanvas ? {} : e ?? {}, t = e instanceof HTMLCanvasElement || e instanceof OffscreenCanvas ? e : Se({
    width: e?.width ?? 320,
    height: e?.height ?? 320
  }), { antialias: n } = r, o = new Ze(t, n, {
    powerPreference: "high-performance",
    ...r
  });
  return o.hideLoadingUI(), o;
}, S = (e) => {
  const r = E.builder({ color: e }).hex();
  return pe.FromHexString(r);
}, V = (e) => {
  const r = E.builder({ color: e }), t = Q.FromHexString(r.hex());
  return t.a = r.alpha(), t;
}, de = (e, r, t, n = {}) => {
  const { camera: o = e.activeCamera, predicate: a = () => !0 } = n, s = e.createPickingRay(r, t, me.Identity(), o);
  return e.pickWithRay(s, a)?.pickedMesh;
}, X = (e, r) => {
  if (e instanceof H)
    return e.meshes.forEach((t) => X(t, r));
  r(e), e.getChildMeshes().forEach((t) => X(t, r));
}, dt = (e, r = {}) => {
  const {
    keySensitivity: t = 0.05,
    mouseSensitivity: n = 0.05,
    parent: o = document.body
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
      parent: o
    }
  ), $.listenToMouse(
    {
      wheel: (a) => {
        if (a instanceof WheelEvent) {
          if (a.shiftKey) {
            const i = a.deltaX * n;
            e.position.addInPlace(y(0, -i, 0));
            return;
          }
          const s = a.deltaY * n;
          e.position.addInPlace(y(0, 0, s));
        }
      },
      click: (a) => {
        if (a.buttons === 0) {
          const s = a, i = e.getScene(), l = de(i, s.layerX, s.layerY);
          x(l) && (console.log({ mesh: l }), X(i, (c) => {
            N(c.material) || c.material && (c.material.wireframe = !1);
          }), l.material && (l.material.wireframe = !0));
        }
      },
      auxclick: (a) => {
        if (a.button !== 1)
          return;
        const s = e.getScene(), i = de(s, a.clientX, a.clientY);
        N(i);
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
}, ht = (e, r, {
  unitsTall: t = 1,
  unitsWide: n = 1,
  cameraLevel: o = -100,
  disposeActive: a = !1
} = {}) => {
  a && e?.activeCamera?.dispose();
  const s = new q(r, y(0, 0, o), e);
  return s.target = y(0, 0, 0), s.rotation = y(0, 0, Math.PI), s.orthoTop = -t / 2, s.orthoBottom = t / 2, s.orthoLeft = n / 2, s.orthoRight = -n / 2, s.mode = O.ORTHOGRAPHIC_CAMERA, s;
}, re = (e, r, t) => {
  const n = e.getCameraByName(r);
  return x(n) ? n : t();
}, ne = (e, r) => {
  const {
    alpha: t,
    beta: n,
    radius: o,
    target: a,
    position: s,
    rotation: i,
    minZ: l,
    maxZ: c,
    mode: p,
    orthoTop: f,
    orthoBottom: d,
    orthoLeft: h,
    orthoRight: u
  } = r;
  w(s, (g) => {
    e.position = y(g);
  }), w(l, (g) => {
    e.minZ = g;
  }), w(c, (g) => {
    e.maxZ = g;
  }), w(p, (g) => {
    e.mode = he[g];
  }), w(p, (g) => {
    e.mode = he[g];
  }), w(f, (g) => {
    e.orthoTop = g;
  }), w(d, (g) => {
    e.orthoBottom = g;
  }), w(h, (g) => {
    e.orthoLeft = g;
  }), w(u, (g) => {
    e.orthoRight = g;
  }), e instanceof Ye && (w(i, (g) => {
    e.rotation = y(g);
  }), w(a, (g) => {
    e.target = y(g);
  })), e instanceof j && (w(t, (g) => {
    e.alpha = g;
  }), w(n, (g) => {
    e.beta = g;
  }), w(o, (g) => {
    e.radius = g;
  }));
}, gt = (e, r, t = {}) => {
  const n = re(e, r, () => {
    const { alpha: o = 0, beta: a = 0, radius: s = 2, target: i } = t;
    return new j(r, o, a, s, y(i), e);
  });
  return ne(n, t), n;
}, ft = (e, r, t = {}) => {
  const n = re(e, r, () => {
    const { position: o } = t;
    return new q(r, y(o), e);
  });
  return ne(n, t), n;
}, pt = (e, r) => {
  e?.activeCamera?.dispose();
  const t = e.getEngine().getRenderingCanvas(), n = -Math.PI / 2, o = Math.PI / 2.5, a = new j(r, n, o, 15, y(0, 0, 0), e);
  a.attachControl(t, !0), a.mode = O.PERSPECTIVE_CAMERA;
}, he = {
  orthographic: O.ORTHOGRAPHIC_CAMERA,
  perspective: O.PERSPECTIVE_CAMERA
}, Ee = {
  getArcRotateCamera: gt,
  getCamera: re,
  updateCamera: ne,
  getUniversalCamera: ft,
  attachArcRotateCameraControls: Ce,
  attachUniversalCameraControls: dt,
  createTopDownCamera: ht,
  createDebugCamera: pt
}, oe = (e, r, t) => {
  const n = e.getLightByName(r);
  return x(n) ? n : t();
}, ae = (e, r) => {
  const { intensity: t, direction: n, position: o } = r;
  w(t, (a) => {
    e.intensity = a;
  }), e instanceof ye && w(n, (a) => {
    e.direction = y(a);
  }), e instanceof xe && w(o, (a) => {
    e.position = y(a);
  });
}, mt = (e, r, t = {}) => {
  const n = oe(e, r, () => {
    const { direction: o } = t;
    return new ye(r, y(o), e);
  });
  return ae(n, t), n;
}, yt = (e, r, t = {}) => {
  const n = oe(e, r, () => {
    const { position: o } = t;
    return new xe(r, y(o), e);
  });
  return ae(n, t), n;
}, Pe = {
  getLight: oe,
  getHemisphericLight: mt,
  getPointLight: yt,
  updateLight: ae
}, P = (e, r, t, n = !1) => {
  const o = e.getMeshByName(r);
  return x(o) && !n ? o : x(o) && n ? t(o) : t();
}, xt = (e, r, t) => {
  const {
    alpha: n,
    diffuseTexture: o,
    emissiveTexture: a,
    ambientTexture: s,
    opacityTexture: i,
    diffuseColor: l,
    specularColor: c,
    ambientColor: p,
    emissiveColor: f
  } = t;
  w(o, (d) => {
    const h = e.getTextureByName(d);
    r.diffuseTexture = h;
  }), w(a, (d) => {
    const h = e.getTextureByName(d);
    r.emissiveTexture = h;
  }), w(s, (d) => {
    const h = e.getTextureByName(d);
    r.ambientTexture = h;
  }), w(i, (d) => {
    const h = e.getTextureByName(d);
    r.opacityTexture = h;
  }), w(l, (d) => {
    r.diffuseColor = S(d);
    const h = E.from(d).alpha();
    h < 1 && (r.alpha = h);
  }), w(c, (d) => {
    r.specularColor = S(d);
  }), w(p, (d) => {
    r.ambientColor = S(d);
  }), w(f, (d) => {
    r.emissiveColor = S(d);
  }), w(n, (d) => {
    r.alpha = d;
  });
}, ge = (e, r, t) => {
  r instanceof U && xt(e, r, t);
}, D = (e, r, t = "standard") => {
  const n = e.getMaterialByName(r);
  if (x(n))
    return n;
  const o = typeof t == "string" ? t : t?.type ?? "standard";
  switch (o) {
    case "standard": {
      const a = new U(r, e);
      return ge(e, a, t), a;
    }
    case "pbr": {
      const a = new Xe(r, e);
      return ge(e, a, t), a;
    }
    default:
      throw new Error(`Unknown material type: '${o}'`);
  }
}, R = (e, r, t) => {
  const { position: n, color: o, material: a, receiveShadows: s } = t;
  r instanceof I && x(a) && (r.material = D(e, a, "standard")), r instanceof I && x(s) && (r.receiveShadows = s), w(n, (i) => {
    r.position = y(i);
  }), w(o, (i) => {
    const l = r.material;
    if (l instanceof U) {
      l.diffuseColor = S(i);
      const c = E.from(i).alpha();
      c < 1 && (l.alpha = c), l.specularColor = S("black"), l.ambientColor = S(i), l.emissiveColor = S(i);
    }
  });
}, ve = (e, r, t = {}) => P(e, r, () => {
  const { width: n = 1, height: o = 1, depth: a = 1, colors: s } = t, i = v.CreateBox(
    r,
    {
      width: n,
      height: o,
      depth: a,
      faceColors: x(s) ? s.map(V) : void 0
    },
    e
  );
  return R(e, i, t), i;
}), Re = (e, r, t) => {
  const {
    width: n = 1,
    height: o = 1,
    depth: a = 1,
    material: s,
    receiveShadows: i = !1
  } = t, l = `box-instance-root-${JSON.stringify([
    n,
    o,
    a,
    s,
    i
  ])}`;
  let c = e.getMeshByName(l);
  if (N(c)) {
    if (c = v.CreateBox(l, { width: n, height: o, depth: a }, e), c.receiveShadows = i, c.isVisible = !1, !s)
      throw new Error("No material", { cause: t });
    c.material = D(e, s, "standard");
  }
  const p = c.createInstance(r);
  return R(e, p, t), p;
}, wt = (e, r, t) => {
  const { radius: n = 0.5 } = t;
  return P(e, r, () => {
    const o = v.CreateSphere(
      r,
      { diameter: n * 2 },
      e
    );
    return R(e, o, t), o;
  });
}, Mt = (e, r, t, n = {}) => {
  const {
    predicate: o = (l) => l.isPickable,
    camera: a = e.activeCamera
  } = n, s = e.createPickingRay(r, t, me.Identity(), a);
  return e.pickWithRay(s, o)?.pickedMesh;
}, bt = (e) => {
  e.computeWorldMatrix(!0), e.refreshBoundingInfo({});
  const [r, t, n] = k(e.getAbsolutePosition()), o = e.getBoundingInfo().boundingSphere.radius;
  return [r, t, n - o];
}, K = (e, r) => {
  if (e instanceof H)
    return e.meshes.forEach((t) => K(t, r));
  r(e), e.getChildMeshes().forEach((t) => K(t, r));
}, Tt = {
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
}, Ct = (e, r, t = {}) => P(e, r, () => {
  const { size: n = 1, type: o = "tetrahedron" } = t, a = v.CreatePolyhedron(
    r,
    { type: Tt[o], size: n },
    e
  );
  return R(e, a, t), a;
}), St = (e) => {
  const r = e.getBoundingInfo().boundingBox.vectors, t = e.getScene(), n = t.getEngine().getRenderingCanvas();
  if (!n)
    throw new Error("No canvas for scene", { cause: t });
  const o = e.getWorldMatrix(), a = t.getTransformMatrix(), s = t.activeCamera.viewport, i = r.map((h) => {
    const u = Y.Project(h, o, a, s);
    return u.x = u.x * n.clientWidth, u.y = u.y * n.clientHeight, u;
  }), [l, c] = ue(i, (h) => h.x), [p, f] = ue(i, (h) => h.y);
  return {
    width: c - l,
    height: f - p,
    left: l,
    top: p,
    right: c,
    bottom: f
  };
}, Et = (e, r, t = {}) => {
  const {
    recurse: n = !0,
    disposeMaterials: o = !1,
    disposeTextures: a = !1
  } = t, s = e.getMeshByName(r);
  if (s) {
    if (s.dispose(!n, !1), o) {
      const i = s.material;
      if (!i)
        return;
      i.name = `DISPOSED-${i.name}`, i?.dispose(!0, a), e.removeMaterial(i);
    }
    e.removeMesh(s);
  }
}, Pt = (e) => {
  if (!N(e))
    return e.sort((r, t) => r.distance - t.distance), e[0];
}, vt = (e, r, t = {}) => P(e, r, () => {
  const { arc: n = 1, height: o = 1, radius: a = 0.5, tag: s } = t, i = v.CreateCylinder(
    r,
    {
      height: o,
      arc: n,
      diameter: a * 2
    },
    e
  );
  return R(e, i, t), i;
}), Rt = (e, r, t) => {
  const { updatable: n = !1 } = t;
  return P(
    e,
    r,
    (o) => It(e, r, {
      ...t,
      instance: o
      // updatable: undefined,
    }),
    n
  );
}, It = (e, r, t) => {
  const {
    colors: n = [],
    points: o = [],
    color: a = "white",
    updatable: s = !1,
    useVertexAlpha: i,
    instance: l
  } = t, c = o.map((d, h) => n[h] ?? a).map((d) => V(d)), p = o.map((d) => y(d)), f = v.CreateLines(r, {
    points: p,
    colors: c,
    updatable: s,
    useVertexAlpha: i,
    instance: l
  });
  return R(e, f, t), f;
}, J = (e, r, t) => {
  const n = e.getMeshByName(r);
  return x(n) ? Promise.resolve(n) : t();
}, At = (e, r, t, n) => P(e, r, () => {
  const o = P(e, t, n);
  return _.assertValue(o, () => (console.log({ scene: e, name: r, rootName: t, producer: n }), "Unable to create mesh instance. Missing root mesh.")), o.createInstance(r);
}), Bt = async (e, r, t, n) => J(e, r, async () => {
  const o = await J(e, t, n);
  return _.assertValue(o, () => (console.log({ scene: e, name: r, rootName: t, producer: n }), "Unable to create mesh instance. Missing root mesh.")), o.createInstance(r);
}), Lt = (e, r, t = {}) => P(e, r, () => {
  const { width: n = 1, height: o = 1, tag: a, doubleSided: s } = t, i = v.CreatePlane(
    r,
    {
      width: n,
      height: o,
      sideOrientation: s ? I.DOUBLESIDE : void 0
    },
    e
  ), { billboard: l } = t;
  return l && (i.billboardMode = I.BILLBOARDMODE_ALL), R(e, i, t), i;
}), Nt = (e, r, t = {}) => P(e, r, () => {
  const { radius: n = 0.5 } = t, o = v.CreateTorusKnot(r, { radius: n }, e);
  return R(e, o, t), o;
}), _t = (e) => {
  const { XYZI: r, SIZE: t } = e, n = t.z, o = 1 / n / 2, a = 1 / n / 2, s = 1 / n / 2;
  return r.map((i) => {
    const [l, c, p] = k(i), f = (l - t.x / 2) / n + o, d = (c - t.y / 2) / n + a, h = (p - t.z / 2) / -n - s;
    return at(st(f, d, h), i.i);
  });
}, Ie = (e, r, t) => {
  const { XYZI: n, RGBA: o, SIZE: a } = r, s = o.map((f) => {
    const { r: d, g: h, b: u, a: g } = f;
    return E.builder({ color: [d, h, u, g], model: "rgba" }).toString();
  }), i = new ee(t, e), l = 1 / a.z, c = v.CreateBox("temp-box", {
    width: l,
    height: l,
    depth: l
  });
  i.addShape(c, n.length), i.buildMesh(), c.dispose(), _t(r).forEach((f, d) => {
    const [h, u] = f, g = i.particles[d];
    g.position = y(h);
    const m = s[u];
    g.color = V(m);
  });
  const p = D(e, "vox-material", "standard");
  return p.specularColor = S("black"), i.mesh.material = p, i.setParticles(), i;
}, kt = (e, r, t, n = {}) => {
  const o = e.metadata ?? {}, { voxes: a = {} } = o, s = a[t];
  if (N(s))
    throw console.log({ scene: e, name: r, src: t }), new Error(`No voxData found for ${t} ${r}`);
  const i = Ie(e, s, r), l = i.mesh;
  return R(e, l, n), i;
}, Ot = (e) => e instanceof Ke, Ht = (e, r) => {
  const [t, n] = fe(F.normalize2(F.subtract2(r, e)));
  return Math.atan2(n, t) + Math.PI / 2;
}, Ae = (e, r = {}) => {
  const {
    disposeSource: t = !1,
    allow32BitsIndices: n = !0,
    meshSubclass: o = void 0,
    subdivideWithSubMeshes: a = !1,
    multiMultiMaterials: s = !1
  } = r;
  return I.MergeMeshes(
    e,
    t,
    n,
    o,
    a,
    s
  );
}, Ut = (e, r, t, n = {}) => {
  const {
    predicate: o = (s) => s.isPickable,
    camera: a = e.activeCamera
  } = n;
  if (!a)
    throw new Error("Camera required");
  return e.multiPick(r, t, o, a);
}, Be = (e, r = /.*/, t = 0) => {
  const n = "".padStart(t * 2);
  if (r.test(e.name)) {
    console.log(`${n}mesh: '${e.name}'`);
    const o = e.material;
    x(o) && Object.entries(o).filter(
      (s) => /.Texture$/.test(s[0])
    ).map((s) => {
      const [i, l] = s;
      l instanceof L && i !== "_environmentBRDFTexture" && console.log(`${n}tex: '${l.name}' (${i})`);
    });
  }
  e.getChildMeshes().map((o) => Be(o, r, t + 1));
}, Le = {
  lookAt: Ht,
  getBox: ve,
  describeMesh: Be,
  getPlane: Lt,
  getBoxInstance: Re,
  getSphere: wt,
  getCylinder: vt,
  getTorusKnot: Nt,
  getLine: Rt,
  walkMeshes: K,
  pickMesh: Mt,
  getMesh: P,
  getMeshAsync: J,
  calcTopOfMeshWorldPosition: bt,
  mergeMeshes: Ae,
  getVoxModel: kt,
  calcClientRectForMesh: St,
  updateArcRotateCameraPosition: Te,
  findClosestPick: Pt,
  destroyMesh: Et,
  getMeshInstance: At,
  getMeshInstanceAsync: Bt,
  isInstancedMesh: Ot,
  pickMeshes: Ut,
  getPolyhedron: Ct,
  updateMesh: R
}, Dt = (e = G()) => {
  const r = new H(e), t = e.getRenderingCanvas();
  Ee.getArcRotateCamera(r, "Camera", {}).attachControl(t, !0), Pe.getHemisphericLight(r, "light1", {
    direction: [1, 1, 1]
  }), Le.getSphere(r, "sphere", {
    radius: 0.5
  });
  const o = { debug: !1 };
  return t.onkeyup = (a) => {
    a.ctrlKey && a.keyCode === 73 && (o.debug = !o.debug, o.debug ? r.debugLayer.hide() : (console.log("SHOW!"), r.debugLayer.show()));
  }, e.runRenderLoop(() => {
    r.render();
  }), r;
}, Zr = {
  createEngine: G,
  createCanvas: Se,
  v3: y,
  c3: S,
  c4: V,
  helloWorld: Dt,
  attachEditorControls: Ce
}, $t = async ({
  canvas: e,
  ...r
}) => {
  const t = new we(e, {
    // powerPreference: "high-performance",
    ...r
  });
  return t.hideLoadingUI(), await t.initAsync(), t;
}, Ft = () => we.IsSupportedAsync, Yr = {
  createWebGlEngine: G,
  createWebGpuEngine: $t,
  isWebGpuCapable: Ft
}, Gt = (e) => (r) => {
};
async function Vt(e, r = e.name) {
  return await e();
}
const se = (e) => {
  const r = Gt();
  return new Promise((t, n) => {
    try {
      e.onAfterRenderCameraObservable.addOnce(() => {
        r(), t();
      }), e.render(!0);
    } catch (o) {
      n(o);
    }
  });
}, zt = (e) => {
  console.log("fixing eyelashes", e.meshes), e.meshes.forEach((r) => {
    if (r.name.includes("Eyelashes") && (console.log("fixing eyelashes", r.name), r.name.includes("primitive1"))) {
      console.log("fixing eyelashes: primitive1", r.name);
      const t = r.material;
      if (!t)
        throw new Error("Mesh has no material", { cause: r });
      const n = t.getActiveTextures()[0];
      n.hasAlpha = !0, n.getAlphaFromRGB = !0, t.transparencyMode = 1, t.opacityTexture = n, r.visibility = 0.5, t.albedoColor = new pe(0, 0, 0);
    }
  });
}, Wt = [
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
], Zt = [
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
], Ne = (e) => {
  const r = e?.material?.getActiveTextures() ?? [];
  if (x(
    r.find((t) => {
      const n = t?.name;
      return x(Wt.find((o) => n.includes(o)));
    })
  ) && (e.visibility = 0), x(
    r.find((t) => {
      const n = t?.name;
      return x(Zt.find((o) => n.includes(o)));
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
  e.getChildMeshes().map(Ne);
}, Yt = (e) => {
  console.log("fixing bump maps", e.meshes), e.meshes.forEach((r) => {
    const t = r.material;
    t && (t.bumpTexture = null);
  });
}, Xt = (e) => {
  zt(e), e.meshes.map(Ne), Yt(e);
}, Kt = (e) => {
  const { path: r, scene: t, name: n = r instanceof File ? r.name : r } = e;
  return t.getEngine().hideLoadingUI(), new Promise((a, s) => {
    try {
      le.ShowLoadingScreen = !1, le.Append(
        "",
        r,
        t,
        (i) => {
          const l = i.getMeshByName("__root__");
          if (!l)
            throw new Error("No root mesh found", { cause: i });
          l.name = n, i.cameras.length > 0 && (i.activeCamera = i.cameras[0]), i.animationGroups.forEach((c) => {
            c.stop();
          }), Xt(i), a(l);
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
  renderOnce: se,
  loadDazFigure: Kt
  // fixDazFigure,
  // loadAssetContainer,
  // builder,
}, _e = (e, r = e.width, t = e.height) => {
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
}, Jt = async (e) => {
  if (typeof e == "string")
    return e;
  const r = document.createElement("canvas");
  return r.width = e.width, r.height = e.height, r.getContext("2d").drawImage(e, 0, 0), await lt.toSrcString(r);
}, ke = async (e, r, t) => {
  if (t instanceof HTMLCanvasElement)
    return new Promise((o, a) => {
      try {
        const s = new te(r, t, e);
        s.update(), s.hasAlpha = !0, o(s);
      } catch (s) {
        a(s);
      }
    });
  const n = await Jt(t);
  return new Promise((o, a) => {
    try {
      const s = new L(n, e, !1, !0);
      s.name = r, s.hasAlpha = !0, s.onLoadObservable.addOnce(() => {
        o(s);
      });
    } catch (s) {
      a(s);
    }
  });
}, Qt = async (e, r) => {
  const t = be.randomUuid(), { size: n, image: o, color: a } = e, s = v.CreatePlane(
    `plane-${t}`,
    {
      width: n,
      height: n
    },
    r
  ), i = new U(`material-${t}`, r);
  if (x(o)) {
    const l = await ke(r, `layer-${t}`, o);
    e._texture = l, e._mesh = s, e._material = i, l.hasAlpha = !0, i.opacityTexture = l, i.emissiveTexture = l;
  }
  return x(a) && (i.emissiveColor = S(a)), s.material = i, s;
}, qt = async (e, r) => {
  const t = new H(r);
  return await Promise.all(
    e.map(async (n, o) => {
      const a = await Qt(n, t);
      return a.position.set(0, 0, -o), a;
    })
  ), t;
}, jt = ({ size: e } = { size: 4096 }) => {
  const r = G({ width: e, height: e }), t = r.getRenderingCanvas(), n = {
    layers: []
  }, o = {
    addLayer: (a) => (n.layers.push({ size: e, ...a }), o),
    render: async () => Vt(async () => {
      const a = await qt(n.layers, r), s = new q("camera1", y(0, 0, -1e3), a);
      if (s.setTarget(y()), s.rotation = y(0, 0, Math.PI), s.mode = O.ORTHOGRAPHIC_CAMERA, s.minZ = 0, s.maxZ = 1e5, await se(a), o.clear(), !t)
        throw new Error("No canvas found", { cause: r });
      return _e(t);
    }, "Texture render"),
    clear: () => (n.layers.forEach((a) => {
      a?._cached || (a?._texture?.dispose(), a?._mesh?.dispose(), a?._material?.dispose());
    }), n.layers.length = 0, o)
  };
  return o;
}, ie = (e, r) => {
  const t = e.getSize(), n = e.getContext();
  r(n, t), e.update();
}, er = (e) => {
  ie(e, (r, t) => {
    const { width: n, height: o } = t;
    r.clearRect(0, 0, n, o);
  });
}, tr = (e, r = "DEBUG IMAGE") => {
  const t = Ue.copyToCanvas(e, 1024, 1024);
  t.style.border = "1px solid grey";
  const n = document.createElement("div");
  return n.textContent = r, document.body.appendChild(n), document.body.appendChild(t), new Promise((o, a) => {
    const s = () => {
      t.remove(), n.remove(), o(void 0);
    };
    t.onclick = s, n.onclick = s;
  });
}, rr = (e, r) => {
  const t = e.getTextureByName(r);
  t && (t.dispose(), e.removeTexture(t));
}, nr = (e, r = {}) => {
  const { color: t = "black" } = r;
  ie(e, (n, o) => {
    const { width: a, height: s } = o;
    n.fillStyle = E.from(t).toString(), n.fillRect(0, 0, a, s);
  });
}, or = (e, r, t = {}) => {
  const {
    backgroundColor: n,
    outline: o = !0,
    color: a = "black",
    fontFamily: s = "monospace",
    fontStyle: i = "bold",
    outlineColor: l = E.builder({ color: "white" }).alpha(0.1).toString(),
    textureSize: c = Math.min(e.getSize().width, e.getSize().height)
  } = t;
  e.hasAlpha = !0;
  let p = c, f = `${i} ${p}px ${s}`;
  const d = e.getContext();
  d.font = f;
  let h = d.measureText(r);
  p = c / h.width * c, f = `${i} ${p}px ${s}`, d.font = f;
  const u = 0;
  h = d.measureText(r);
  const g = h.fontBoundingBoxAscent ?? 0, m = c - (c - g) / 2;
  d.lineWidth = p / 2;
  const M = {
    x: 0,
    y: m - p,
    width: c,
    height: g * 2
  };
  if (x(n)) {
    d.fillStyle = E.from(n).toString();
    const { x: T, y: A, width: Z, height: ce } = M;
    d.fillRect(T, A, Z, ce);
  }
  return o && (d.strokeStyle = l, d.strokeText(r, u, m)), d.fillStyle = a, d.fillText(r, u, m), e.hasAlpha = !0, e.update(), M;
}, Oe = {
  linearNearest: L.LINEAR_NEAREST,
  nearestNearest: L.NEAREST_NEAREST,
  linearLinear: L.LINEAR_LINEAR,
  nearestLinear: L.NEAREST_LINEAR
}, z = (e, r, t) => {
  const n = e.getTextureByName(r);
  return x(n) ? n : t();
}, W = (e, r) => {
  const { hasAlpha: t } = r;
  w(t, (n) => {
    e.hasAlpha = n;
  }), e instanceof te && e.update();
}, ar = (e, r, t = {}) => {
  const n = z(e, r, () => {
    const {
      generateMipMaps: o = !0,
      samplingMode: a = "linearNearest",
      width: s = 1024,
      height: i = 1024,
      init: l
    } = t, c = new te(
      r,
      {
        width: s,
        height: i
      },
      e,
      o,
      Oe[a]
    );
    return l && (l(c.getContext()), c.update()), c;
  });
  return W(n, t), n;
}, He = (e) => Oe[e], sr = (e, r, t) => z(e, r, () => {
  const {
    element: n,
    generateMipMaps: o = !0,
    samplingMode: a = "linearNearest"
  } = t;
  if (!n)
    throw new Error("HTML element is required to create texture", {
      cause: t
    });
  const s = new Je(r, n, {
    generateMipMaps: o,
    samplingMode: He(a),
    engine: e.getEngine(),
    scene: e
  });
  return W(s, t), s;
}), ir = (e, r, t) => {
  const n = z(e, r, () => {
    const {
      src: o,
      generateMipMaps: a = !0,
      samplingMode: s = "linearNearest"
    } = t;
    if (!o)
      throw new Error("src is required", { cause: t });
    const i = new L(o, e, {
      samplingMode: He(s)
    });
    return i.name = r, i;
  });
  return W(n, t), n;
}, Ue = {
  builder: jt,
  copyToCanvas: _e,
  debugImage: tr,
  getTexture: z,
  getHtmlElementTexture: sr,
  getDynamicTexture: ar,
  getPathTexture: ir,
  updateTexture: W,
  imageToTexture: ke,
  drawTextOnTexture: or,
  drawOnTexture: ie,
  drawBackgroundOnTexture: nr,
  clearTexture: er,
  destroyTexture: rr
}, cr = (e, r, t) => {
  const n = e?.effectLayers?.length ? e.getGlowLayerByName(r) : void 0;
  return x(n) ? n : new Me(r, e, t);
}, lr = (e, r, t) => {
  const n = e.getHighlightLayerByName(r);
  return x(n) ? n : new Qe(r, e, t);
}, Kr = {
  getGlowLayer: cr,
  getHighlightLayer: lr
}, De = {
  getMaterial: D
  // updateMaterial,
  // updateStandardMaterial,
}, ur = (e, r) => {
  const t = e.getTransformNodeByName(r);
  return x(t) ? t : new qe(r, e);
}, Jr = {
  getTransformNode: ur
}, dr = (e) => {
  const r = e.metadata ?? {}, t = r.solidParticleSystems ?? {};
  return x(t) || (e.metadata = {
    ...r,
    solidParticleSystems: {}
  }), t;
}, $e = (e, r, t) => {
  const n = dr(e), o = n[r];
  x(o);
  const a = t();
  return n[r] = a, a;
}, hr = (e, r, t) => $e(e, r, () => new ee(r, e, {
  ...t
})), gr = (e, r, t = {}) => {
  const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), { material: l, onMeshBuild: c, ...p } = t;
  let f;
  const d = () => {
    f?.dispose(), f = new ee(r, e, {
      ...p
    });
  };
  d();
  const h = {
    scene: e,
    getSystem: () => f,
    getNames: () => s.keys(),
    hasMesh: (u) => s.has(u),
    getInstance: () => f,
    updateNextParticle: (u, g) => {
      const m = _.assertValue(
        s.get(u)
      ), M = _.assertValue(n.get(u)), T = m[M];
      h.updateParticleByIndex(T, g), n.set(u, M + 1);
    },
    updateParticleByIndex: (u, g) => {
      const m = f.particles[u];
      _.assertValue(m, `particle not found for ${u}`), m.alive = !0, g(m, u);
    },
    updateParticlesByName: (u, g) => {
      const m = s.get(u);
      m && m.forEach((M) => {
        h.updateParticleByIndex(M, g);
      });
    },
    removeMesh: (u) => {
      o.delete(u), a.delete(u), s.delete(u.name), i.delete(u.name), h.rebuild();
    },
    addMesh: (u, g = 1) => {
      if (o.has(u))
        throw new Error(
          `Mesh ${u.name} already exists in the Sps. Use removeMesh to remove it first.`
        );
      n.set(u.name, 0), o.set(u, g), i.set(u.name, u), h.rebuild(), u.setEnabled(!1);
    },
    rebuild: () => {
      d(), a.clear();
      try {
        o.forEach((g, m) => {
          f.addShape(m, g);
          for (let M = 0; M < g; M++) {
            const T = f.particles.length - 1 - M;
            a.set(m, [
              ...a.get(m) || [],
              T
            ]), s.set(m.name, [
              ...a.get(m) || [],
              T
            ]);
          }
        });
        const u = f.buildMesh();
        l && (u.material = De.getMaterial(e, l)), c?.(u);
      } catch (u) {
        console.error(u);
      }
    },
    syncParticlestoMeshes: () => {
      a.forEach((u, g) => {
        for (let m = 0; m < u.length; m++) {
          const M = u[m], T = _.assertValue(f.particles[M]);
          if (T.position.copyFrom(g.position), T.rotation.copyFrom(g.rotation), T.scaling.copyFrom(g.scaling), g.material instanceof U) {
            const A = g.material.diffuseColor;
            T.color = new Q(A.r, A.g, A.b, g.material.alpha);
          }
        }
      });
    },
    dispose: () => {
      o.clear(), a.clear(), s.clear(), i.clear(), n.clear(), f?.mesh?.dispose(), f.dispose();
    },
    update: () => {
      f.setParticles(), n.forEach((u, g) => {
        n.set(g, 0);
      }), f.particles.forEach((u) => {
        u.alive = !1;
      });
    }
  };
  return h;
}, fr = {
  getSolidParticleSystem: hr,
  getParticleSystem: $e,
  Sps: gr
}, pr = (e, r, t) => new je(y(e), y(r), t), mr = (e, r, t = {}) => {
  const {
    trianglePredicate: n,
    fastCheck: o,
    predicate: a = (s) => s.isPickable
  } = t;
  return e.pickWithRay(r, a, o, n);
}, Qr = {
  createRay: pr,
  pickWithRay: mr
}, yr = (e) => new H(e), xr = (e) => {
  e.debugLayer.isVisible() ? e.debugLayer.hide() : e.debugLayer.show();
}, qr = {
  createScene: yr,
  toggleInspector: xr,
  renderOnce: se
}, wr = (e) => {
  const r = e.getScene();
  e.dispose(), r.getLightsByTags("shadowCaster").forEach((n) => {
    n.metadata.shadowGenerator.removeShadowCaster(e);
  });
}, Mr = (e) => (e.getScene().getLightsByTags("shadowCaster").forEach((n) => {
  n.metadata.shadowGenerator.addShadowCaster(e);
}), () => {
  wr(e);
}), jr = {
  addShadowToMesh: Mr
}, br = (e, r, t = {}) => {
  const n = new Me(r, e, t);
  return n.neutralColor = new Q(0, 0, 0, 0), n;
}, en = {
  addGlowLayer: br,
  Constants: et
};
async function Tr({
  baseUrl: e,
  imageNames: r,
  atlasSize: t,
  padding: n = 0
}) {
  const o = document.createElement("canvas");
  o.width = t, o.height = t;
  const a = o.getContext("2d"), s = {}, i = [];
  let l = 0, c = 0, p = 0;
  for (const d of r) {
    const h = d.endsWith(".png") ? d : `${d}.png`, u = await Cr(`${e}/${h}`), g = u.width + n * 2, m = u.height + n * 2;
    if (l + g > t && (l = 0, c += p, p = 0), c + m > t)
      throw new Error(`Not enough space in atlas for image: ${h}`);
    a.drawImage(u, l + n, c + n), s[h] = {
      frame: {
        x: l + n,
        y: c + n,
        w: u.width,
        h: u.height
      }
    }, i.push({
      filename: h,
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
    }), l += g, p = Math.max(p, m);
  }
  const f = await new Promise(
    (d) => o.toBlob((h) => d(h), "image/png")
  );
  return {
    canvas: o,
    atlasBlob: f,
    spritePackageManagerJson: { frames: s },
    babylonSpriteMapJson: { frames: i }
  };
}
async function Cr(e) {
  return new Promise((r, t) => {
    const n = new Image();
    n.src = e, n.onload = () => r(n), n.onerror = (o) => t(new Error(`Failed to load image: ${e}`));
  });
}
const Sr = (e, r, t = {}) => {
  const n = e?.spriteManagers?.find((d) => d.name === r);
  if (x(n))
    return n;
  const {
    capacity: o = 1,
    atlasUrl: a,
    atlasBlob: s,
    epsilon: i,
    samplingMode: l,
    spriteJSON: c,
    options: p
  } = t;
  let f;
  try {
    s && (f = URL.createObjectURL(s));
    const d = x(a) ? a : f;
    if (N(d))
      throw new Error("altasUrl or atlasBlob is required", { cause: t });
    return new tt(
      r,
      d,
      o,
      e,
      c,
      i,
      l,
      p
    );
  } finally {
    f && URL.revokeObjectURL(f);
  }
}, Fe = (e, r, t = {}) => {
  const n = e?.spriteManagers?.find((u) => u.name === r);
  if (x(n))
    return n;
  const {
    capacity: o = 1,
    cellSize: a = 64,
    atlasUrl: s,
    atlasBlob: i,
    epsilon: l,
    samplingMode: c,
    fromPacked: p,
    spriteJSON: f,
    options: d
  } = t;
  let h;
  try {
    i && (h = URL.createObjectURL(i));
    const u = x(s) ? s : h;
    if (N(u))
      throw new Error("altasUrl or atlasBlob is required", { cause: t });
    return new rt(
      r,
      u,
      o,
      a,
      e,
      l,
      c,
      p,
      f,
      d
    );
  } finally {
    h && URL.revokeObjectURL(h);
  }
}, Er = (e, r, t) => {
  const n = ct(Fe(e, t)), o = n?.sprites?.find((a) => a.name === r);
  return x(o) ? o : new nt(r, n);
}, tn = {
  getSpriteManager: Fe,
  getSprite: Er,
  createTextureAtlas: Tr,
  getSpritePackedManager: Sr
}, Pr = (e, r = {}) => {
  const {
    random: t = be.globalRandom,
    radius: n = 1,
    maxBounce: o = 0,
    groundZ: a = 0,
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
    const { bounces: c = o } = e.props ?? {};
    if (c <= 0) {
      t() < i && l();
      return;
    }
    const p = c / o, f = e.position, [d, h, u] = k(f), g = (We) => (t() * n * 2 - n) * (p / 4) + We, [m, M] = [g(d), g(h)], T = y([m, M, a]), [A, Z, ce] = k(F.midPoint3(f, T)), Ge = y(A, Z, u - t() * p * 3), Ve = {
      path: ot.CreateCatmullRomSpline([f, Ge, T], s).getPoints().reverse(),
      bounces: c - 1
      // rotationAxis: [2 * random() - 1, 2 * random() - 1, 2 * random() - 1],
    }, ze = e.props ?? {};
    e.props = { ...ze, ...Ve };
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
    t = t || ((a) => a === "true");
    let n;
    const o = r.split("||");
    for (const a in o)
      if (Object.prototype.hasOwnProperty.call(o, a)) {
        let s = B._SimplifyNegation(o[a].trim());
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
  static AddTagsTo(r, t) {
    if (!t || typeof t != "string")
      return;
    const n = t.split(" ");
    for (const o of n)
      C._AddTagTo(r, o);
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
    for (const o in n)
      C._RemoveTagFrom(r, n[o]);
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
const vr = (e, r, t) => {
  const { XYZI: n, RGBA: o } = r, a = o.map((i) => {
    const { r: l, g: c, b: p, a: f } = i;
    return E.builder({ color: [l, c, p, f], model: "rgba" }).toString();
  }), s = new I(t, e);
  return n.map((i, l) => {
    const c = a[i.i], p = Re(e, `voxel-${c}`, {
      color: c,
      material: `voxel-material-${c}`
    });
    return p.position = y(i), p.parent = s, p;
  }), C.AddTagsTo(s, "complex"), s;
}, Rr = (e) => {
  const r = Object.entries(e).sort((t, n) => {
    const [o] = t, [a] = n;
    return o.localeCompare(a);
  });
  return JSON.stringify(r);
}, Ir = (e) => {
  const r = {};
  return e.forEach((t) => {
    const n = t?.material?.name;
    if (!n)
      throw new Error("Mesh material is missing name", { cause: t });
    const o = r[n] ?? [];
    o.push(t), r[n] = o;
  }), r;
}, Ar = (e, r, t) => {
  const { XYZI: n, RGBA: o } = r, a = o.map((d) => {
    const { r: h, g: u, b: g, a: m } = d;
    return E.builder({ color: [h, u, g, m], model: "rgba" }).toString();
  }), s = n.map((d, h) => {
    const u = a[d.i], [g, m, M] = k(d), T = ve(
      e,
      `voxel-merged-${u}-${Rr(d)}`,
      {
        position: [g, m, M],
        // color,
        // material: `voxel-merged-material-${color}`,
        material: "voxel-material",
        colors: it.from(6).map(() => u)
      }
    );
    return T.setEnabled(!1), T;
  }), i = Ir(s), l = Object.values(i).map((d) => Ae(d)), c = new I(`merged-${t}`, e);
  l.filter(x).forEach((d) => d.parent = c);
  const p = D(e, "voxel-material", "standard");
  l.filter(x).forEach((d) => d.material = p), c.metadata = {
    voxels: s
  }, C.AddTagsTo(c, "merged");
  const f = new I(t, e);
  return f.metadata = {
    voxels: s
  }, c.parent = f, f;
}, rn = {
  animateExplosion: Pr,
  voxDataToSps: Ie,
  voxDataToMergedModel: Ar,
  voxDataToComplexModel: vr
}, Br = ({
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
  const o = new b.StandardMaterial("mat");
  o.diffuseTexture = new b.Texture("textures/earth.jpg");
  const a = new b.StandardMaterial("mat"), s = new b.Texture("textures/fire.jpg");
  a.diffuseTexture = s;
  const i = new b.SolidParticleSystem("SPS", t, {
    useModelMaterial: !0
  }), l = b.MeshBuilder.CreateBox("FOO");
  return l.material = o, i.addShape(l, 1e4), i.buildMesh(), i.initParticles = () => {
    for (let p = 0; p < i.nbParticles; p++) {
      const f = i.particles[p];
      f.position.x = b.Scalar.RandomRange(-20, 20), f.position.y = b.Scalar.RandomRange(-20, 20), f.position.z = b.Scalar.RandomRange(-20, 20);
    }
  }, i.initParticles(), i.setParticles(), { scene: t, update: () => {
    const p = Math.sin(Date.now() * 5e-3);
    i.particles.forEach((f, d) => {
      d > 20 ? (f.rotation.x = p, o.alpha = p, o.diffuseTexture = s) : f.rotation.y = p;
    }), i.setParticles();
  } };
}, Lr = ({
  engine: e,
  canvas: r
}) => {
  const t = new b.Scene(e);
  console.log(t), Ee.getArcRotateCamera(t, "ArcRotateCamera", {
    alpha: -Math.PI / 2,
    beta: Math.PI / 2.2,
    radius: 50,
    target: [0, 0, 0]
  }).attachControl(r, !0), Pe.getHemisphericLight(t, "light", {
    direction: [0, 1, -1]
  });
  const o = Ue.getPathTexture(t, "tex", {
    src: "/images/test.jpg"
  }), a = De.getMaterial(t, "mat", {
    opacityTexture: o.name
    // diffuseColor: Colors.from("red").alpha(0.99).toString(),
    // alpha: 0.99,
  }), s = Le.getBox(
    t,
    "box1"
    //  { material: mat.name }
  ), i = fr.Sps(t, "sps", {
    material: a.name,
    updatable: !0,
    // enableDepthSort: true,
    onMeshBuild: (c) => {
      c.useVertexColors = !0, c.hasVertexAlpha = !0;
    }
  });
  return i.addMesh(s, 1e4), i.updateParticlesByName("box1", (c, p) => {
    c.position.x = b.Scalar.RandomRange(-20, 20), c.position.y = b.Scalar.RandomRange(-20, 20), c.position.z = b.Scalar.RandomRange(-20, 20);
  }), { scene: t, update: () => {
    const c = Math.sin(Date.now() * 5e-3), p = ut.noiseStream(0);
    i.updateParticlesByName("box1", (f, d) => {
      f.color = new b.Color4(p(), p(), p(), 0.5), Math.random() > 0.5 ? f.rotation.x = p() * c : f.rotation.y = p() * c;
    }), i.update();
  } };
}, nn = {
  spsDebug: Br,
  spsDebug2: Lr
};
export {
  Zr as Babs,
  he as CAMERA_MODES,
  Ee as Cameras,
  nn as Debugs,
  Yr as Engines,
  Kr as Layers,
  Pe as Lights,
  De as Materials,
  Le as Meshes,
  Xr as Models,
  Jr as Nodes,
  fr as Particles,
  Qr as Rays,
  qr as Scenes,
  jr as Shadows,
  en as Specials,
  tn as Sprites,
  Ue as Textures,
  rn as Voxels,
  br as addGlowLayer
};
//# sourceMappingURL=index.js.map
