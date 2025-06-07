import { Inputs as W } from "@mjt-engine/input";
import { toVec3 as k, Maths as V, toVec2 as xe } from "@mjt-engine/math";
import * as b from "@babylonjs/core";
import { Vector3 as J, Engine as Qe, Matrix as we, Scene as D, UniversalCamera as te, Camera as O, TargetCamera as qe, ArcRotateCamera as re, FreeCamera as je, WebXRCamera as et, HemisphericLight as Me, PointLight as be, Color4 as z, Color3 as Te, StandardMaterial as F, PBRMaterial as tt, Mesh as A, MeshBuilder as v, SolidParticleSystem as ne, InstancedMesh as rt, Texture as B, WebGPUEngine as Ce, SceneLoader as ge, DynamicTexture as ae, HtmlElementTexture as nt, GlowLayer as Se, HighlightLayer as at, TransformNode as ot, Ray as st, Constants as it, SpritePackedManager as ct, SpriteManager as lt, Sprite as ut, Curve3 as dt } from "@babylonjs/core";
import { isUndefined as N, isDefined as x, iff as w, tuple2 as ht, tuple3 as gt, Arrays as ft } from "@mjt-engine/object";
import { Colors as E } from "@mjt-engine/color";
import { extent as fe } from "d3-array";
import { Asserts as _, assertValue as pt } from "@mjt-engine/assert";
import "@babylonjs/inspector";
import { Randoms as Ee } from "@mjt-engine/random";
import { Images as mt } from "@mjt-engine/image";
import { Noises as yt } from "@mjt-engine/noise";
function y(e = 0, r = 0, t = 0) {
  if (typeof e == "number")
    return new J(e, r, t);
  const [n = 0, a = 0, o = 0] = k(e);
  return new J(n, a, o);
}
const Pe = (e, r) => {
  const t = e.alpha, n = e.beta, a = e.radius;
  e.target = e.target.add(y(r)), e.radius = a, e.alpha = t, e.beta = n;
}, ve = (e, r = {}) => {
  const {
    keySensitivity: t = 0.5,
    mouseSensitivity: n = 0.05,
    parent: a = document.body,
    action: o = () => {
    }
  } = r, s = e.alpha, i = e.beta, l = e.radius;
  y(e.target);
  const c = (f = 0, u = 0, h = 0) => {
    Pe(e, [f, u, h]), o();
  }, p = W.listenToKey(
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
    const h = V.subtract2(u, f), [m, M] = xe(h);
    if (f.buttons === 4 && f.shiftKey) {
      e.beta = e.beta + M * n;
      return;
    }
    f.buttons === 4 && (c(M * n, -M * n, 0), c(m * n, m * n, 0));
  });
  const d = W.listenToMouse(
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
}, Re = ({
  width: e = 320,
  height: r = 320
}) => {
  const t = document.createElement("canvas");
  return t.width = e, t.height = r, t;
}, H = (e) => {
  const r = e instanceof HTMLCanvasElement || e instanceof OffscreenCanvas ? {} : e ?? {}, t = e instanceof HTMLCanvasElement || e instanceof OffscreenCanvas ? e : Re({
    width: e?.width ?? 320,
    height: e?.height ?? 320
  }), { antialias: n, xrCompatible: a = !0 } = r, o = new Qe(t, n, {
    powerPreference: "high-performance",
    xrCompatible: a,
    ...r
  });
  return o.hideLoadingUI(), o;
}, pe = (e, r, t, n = {}) => {
  const { camera: a = e.activeCamera, predicate: o = () => !0 } = n, s = e.createPickingRay(r, t, we.Identity(), a);
  return e.pickWithRay(s, o)?.pickedMesh;
}, Q = (e, r) => {
  if (e instanceof D)
    return e.meshes.forEach((t) => Q(t, r));
  r(e), e.getChildMeshes().forEach((t) => Q(t, r));
}, xt = (e, r = {}) => {
  const {
    keySensitivity: t = 0.05,
    mouseSensitivity: n = 0.05,
    parent: a = document.body
  } = r;
  W.listenToKey(
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
  ), W.listenToMouse(
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
          const s = o, i = e.getScene(), l = pe(i, s.layerX, s.layerY);
          x(l) && (console.log({ mesh: l }), Q(i, (c) => {
            N(c.material) || c.material && (c.material.wireframe = !1);
          }), l.material && (l.material.wireframe = !0));
        }
      },
      auxclick: (o) => {
        if (o.button !== 1)
          return;
        const s = e.getScene(), i = pe(s, o.clientX, o.clientY);
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
}, wt = (e, r, {
  unitsTall: t = 1,
  unitsWide: n = 1,
  cameraLevel: a = -100,
  disposeActive: o = !1
} = {}) => {
  o && e?.activeCamera?.dispose();
  const s = new te(r, y(0, 0, a), e);
  return s.target = y(0, 0, 0), s.rotation = y(0, 0, Math.PI), s.orthoTop = -t / 2, s.orthoBottom = t / 2, s.orthoLeft = n / 2, s.orthoRight = -n / 2, s.mode = O.ORTHOGRAPHIC_CAMERA, s;
}, U = (e, r, t) => {
  const n = e.getCameraByName(r);
  return x(n) ? n : t();
}, $ = (e, r) => {
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
    e.mode = me[h];
  }), w(p, (h) => {
    e.mode = me[h];
  }), w(g, (h) => {
    e.orthoTop = h;
  }), w(d, (h) => {
    e.orthoBottom = h;
  }), w(f, (h) => {
    e.orthoLeft = h;
  }), w(u, (h) => {
    e.orthoRight = h;
  }), e instanceof qe && (w(i, (h) => {
    e.rotation = y(h);
  }), w(o, (h) => {
    e.target = y(h);
  })), e instanceof re && (w(t, (h) => {
    e.alpha = h;
  }), w(n, (h) => {
    e.beta = h;
  }), w(a, (h) => {
    e.radius = h;
  }));
}, Mt = (e, r, t = {}) => {
  const n = U(e, r, () => {
    const { alpha: a = 0, beta: o = 0, radius: s = 2, target: i } = t;
    return new re(r, a, o, s, y(i), e);
  });
  return $(n, t), n;
}, bt = (e, r, t = {}) => {
  const n = U(e, r, () => {
    const { position: a } = t;
    return new te(r, y(a), e);
  });
  return $(n, t), n;
}, Tt = (e, r) => {
  e?.activeCamera?.dispose();
  const t = e.getEngine().getRenderingCanvas(), n = -Math.PI / 2, a = Math.PI / 2.5, o = new re(r, n, a, 15, y(0, 0, 0), e);
  o.attachControl(t, !0), o.mode = O.PERSPECTIVE_CAMERA;
}, Ct = (e, r, t = {}) => {
  const n = U(e, r, () => {
    const { position: a = [0, 0, 0] } = t;
    return new je(r, jt.v3(a), e);
  });
  return $(n, t), n;
}, St = (e, r, t, n = {}) => {
  const a = U(e, r, () => new et(r, e, t));
  return $(a, n), a;
}, me = {
  orthographic: O.ORTHOGRAPHIC_CAMERA,
  perspective: O.PERSPECTIVE_CAMERA
}, oe = {
  getArcRotateCamera: Mt,
  getCamera: U,
  updateCamera: $,
  getUniversalCamera: bt,
  getFreeCamera: Ct,
  getWebXrCamera: St,
  attachArcRotateCameraControls: ve,
  attachUniversalCameraControls: xt,
  createTopDownCamera: wt,
  createDebugCamera: Tt
}, se = (e, r, t) => {
  const n = e.getLightByName(r);
  return x(n) ? n : t();
}, ie = (e, r) => {
  const { intensity: t, direction: n, position: a } = r;
  w(t, (o) => {
    e.intensity = o;
  }), e instanceof Me && w(n, (o) => {
    e.direction = y(o);
  }), e instanceof be && w(a, (o) => {
    e.position = y(o);
  });
}, Et = (e, r, t = {}) => {
  const n = se(e, r, () => {
    const { direction: a } = t;
    return new Me(r, y(a), e);
  });
  return ie(n, t), n;
}, Pt = (e, r, t = {}) => {
  const n = se(e, r, () => {
    const { position: a } = t;
    return new be(r, y(a), e);
  });
  return ie(n, t), n;
}, ce = {
  getLight: se,
  getHemisphericLight: Et,
  getPointLight: Pt,
  updateLight: ie
}, X = (e) => {
  const r = E.builder({ color: e }), t = z.FromHexString(r.hex());
  return t.a = r.alpha(), t;
}, P = (e, r, t, n = !1) => {
  const a = e.getMeshByName(r);
  return x(a) && !n ? a : x(a) && n ? t(a) : t();
}, S = (e) => {
  const r = E.builder({ color: e }).hex();
  return Te.FromHexString(r);
}, Ae = (e, r, t) => {
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
}, q = (e, r, t) => {
  r instanceof F && Ae(e, r, t);
}, G = (e, r, t = "standard") => {
  const n = e.getMaterialByName(r);
  if (x(n))
    return n;
  const a = typeof t == "string" ? t : t?.type ?? "standard";
  switch (a) {
    case "standard": {
      const o = new F(r, e);
      return q(e, o, t), o;
    }
    case "pbr": {
      const o = new tt(r, e);
      return q(e, o, t), o;
    }
    default:
      throw new Error(`Unknown material type: '${a}'`);
  }
}, R = (e, r, t) => {
  const { position: n, color: a, material: o, receiveShadows: s } = t;
  r instanceof A && x(o) && (r.material = G(e, o, "standard")), r instanceof A && x(s) && (r.receiveShadows = s), w(n, (i) => {
    r.position = y(i);
  }), w(a, (i) => {
    const l = r.material;
    if (l instanceof F) {
      l.diffuseColor = S(i);
      const c = E.from(i).alpha();
      c < 1 && (l.alpha = c), l.specularColor = S("black"), l.ambientColor = S(i), l.emissiveColor = S(i);
    }
  });
}, Ie = (e, r, t = {}) => P(e, r, () => {
  const { width: n = 1, height: a = 1, depth: o = 1, colors: s } = t, i = v.CreateBox(
    r,
    {
      width: n,
      height: a,
      depth: o,
      faceColors: x(s) ? s.map(X) : void 0
    },
    e
  );
  return R(e, i, t), i;
}), Le = (e, r, t) => {
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
    c.material = G(e, s, "standard");
  }
  const p = c.createInstance(r);
  return R(e, p, t), p;
}, vt = (e, r, t) => {
  const { radius: n = 0.5 } = t;
  return P(e, r, () => {
    const a = v.CreateSphere(
      r,
      { diameter: n * 2 },
      e
    );
    return R(e, a, t), a;
  });
}, Rt = (e, r, t, n = {}) => {
  const {
    predicate: a = (l) => l.isPickable,
    camera: o = e.activeCamera
  } = n, s = e.createPickingRay(r, t, we.Identity(), o);
  return e.pickWithRay(s, a)?.pickedMesh;
}, At = (e) => {
  e.computeWorldMatrix(!0), e.refreshBoundingInfo({});
  const [r, t, n] = k(e.getAbsolutePosition()), a = e.getBoundingInfo().boundingSphere.radius;
  return [r, t, n - a];
}, j = (e, r) => {
  if (e instanceof D)
    return e.meshes.forEach((t) => j(t, r));
  r(e), e.getChildMeshes().forEach((t) => j(t, r));
}, It = {
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
}, Lt = (e, r, t = {}) => P(e, r, () => {
  const { size: n = 1, type: a = "tetrahedron" } = t, o = v.CreatePolyhedron(
    r,
    { type: It[a], size: n },
    e
  );
  return R(e, o, t), o;
}), Bt = (e) => {
  const r = e.getBoundingInfo().boundingBox.vectors, t = e.getScene(), n = t.getEngine().getRenderingCanvas();
  if (!n)
    throw new Error("No canvas for scene", { cause: t });
  const a = e.getWorldMatrix(), o = t.getTransformMatrix(), s = t.activeCamera.viewport, i = r.map((f) => {
    const u = J.Project(f, a, o, s);
    return u.x = u.x * n.clientWidth, u.y = u.y * n.clientHeight, u;
  }), [l, c] = fe(i, (f) => f.x), [p, g] = fe(i, (f) => f.y);
  return {
    width: c - l,
    height: g - p,
    left: l,
    top: p,
    right: c,
    bottom: g
  };
}, Nt = (e, r, t = {}) => {
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
}, _t = (e) => {
  if (!N(e))
    return e.sort((r, t) => r.distance - t.distance), e[0];
}, kt = (e, r, t = {}) => P(e, r, () => {
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
}), Ot = (e, r, t) => {
  const { updatable: n = !1 } = t;
  return P(
    e,
    r,
    (a) => Dt(e, r, {
      ...t,
      instance: a
      // updatable: undefined,
    }),
    n
  );
}, Dt = (e, r, t) => {
  const {
    colors: n = [],
    points: a = [],
    color: o = "white",
    updatable: s = !1,
    useVertexAlpha: i,
    instance: l
  } = t, c = a.map((d, f) => n[f] ?? o).map((d) => X(d)), p = a.map((d) => y(d)), g = v.CreateLines(r, {
    points: p,
    colors: c,
    updatable: s,
    useVertexAlpha: i,
    instance: l
  });
  return R(e, g, t), g;
}, ee = (e, r, t) => {
  const n = e.getMeshByName(r);
  return x(n) ? Promise.resolve(n) : t();
}, Ft = (e, r, t, n) => P(e, r, () => {
  const a = P(e, t, n);
  return _.assertValue(a, () => (console.log({ scene: e, name: r, rootName: t, producer: n }), "Unable to create mesh instance. Missing root mesh.")), a.createInstance(r);
}), Ht = async (e, r, t, n) => ee(e, r, async () => {
  const a = await ee(e, t, n);
  return _.assertValue(a, () => (console.log({ scene: e, name: r, rootName: t, producer: n }), "Unable to create mesh instance. Missing root mesh.")), a.createInstance(r);
}), Ut = (e, r, t = {}) => P(e, r, () => {
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
}), $t = (e, r, t = {}) => P(e, r, () => {
  const { radius: n = 0.5 } = t, a = v.CreateTorusKnot(r, { radius: n }, e);
  return R(e, a, t), a;
}), Gt = (e) => {
  const { XYZI: r, SIZE: t } = e, n = t.z, a = 1 / n / 2, o = 1 / n / 2, s = 1 / n / 2;
  return r.map((i) => {
    const [l, c, p] = k(i), g = (l - t.x / 2) / n + a, d = (c - t.y / 2) / n + o, f = (p - t.z / 2) / -n - s;
    return ht(gt(g, d, f), i.i);
  });
}, Be = (e, r, t) => {
  const { XYZI: n, RGBA: a, SIZE: o } = r, s = a.map((g) => {
    const { r: d, g: f, b: u, a: h } = g;
    return E.builder({ color: [d, f, u, h], model: "rgba" }).toString();
  }), i = new ne(t, e), l = 1 / o.z, c = v.CreateBox("temp-box", {
    width: l,
    height: l,
    depth: l
  });
  i.addShape(c, n.length), i.buildMesh(), c.dispose(), Gt(r).forEach((g, d) => {
    const [f, u] = g, h = i.particles[d];
    h.position = y(f);
    const m = s[u];
    h.color = X(m);
  });
  const p = G(e, "vox-material", "standard");
  return p.specularColor = S("black"), i.mesh.material = p, i.setParticles(), i;
}, Wt = (e, r, t, n = {}) => {
  const a = e.metadata ?? {}, { voxes: o = {} } = a, s = o[t];
  if (N(s))
    throw console.log({ scene: e, name: r, src: t }), new Error(`No voxData found for ${t} ${r}`);
  const i = Be(e, s, r), l = i.mesh;
  return R(e, l, n), i;
}, Vt = (e) => e instanceof rt, zt = (e, r) => {
  const [t, n] = xe(V.normalize2(V.subtract2(r, e)));
  return Math.atan2(n, t) + Math.PI / 2;
}, Ne = (e, r = {}) => {
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
}, Xt = (e, r, t, n = {}) => {
  const {
    predicate: a = (s) => s.isPickable,
    camera: o = e.activeCamera
  } = n;
  if (!o)
    throw new Error("Camera required");
  return e.multiPick(r, t, a, o);
}, _e = (e, r = /.*/, t = 0) => {
  const n = "".padStart(t * 2);
  if (r.test(e.name)) {
    console.log(`${n}mesh: '${e.name}'`);
    const a = e.material;
    x(a) && Object.entries(a).filter(
      (s) => /.Texture$/.test(s[0])
    ).map((s) => {
      const [i, l] = s;
      l instanceof B && i !== "_environmentBRDFTexture" && console.log(`${n}tex: '${l.name}' (${i})`);
    });
  }
  e.getChildMeshes().map((a) => _e(a, r, t + 1));
}, le = {
  lookAt: zt,
  getBox: Ie,
  describeMesh: _e,
  getPlane: Ut,
  getBoxInstance: Le,
  getSphere: vt,
  getCylinder: kt,
  getTorusKnot: $t,
  getLine: Ot,
  walkMeshes: j,
  pickMesh: Rt,
  getMesh: P,
  getMeshAsync: ee,
  calcTopOfMeshWorldPosition: At,
  mergeMeshes: Ne,
  getVoxModel: Wt,
  calcClientRectForMesh: Bt,
  updateArcRotateCameraPosition: Pe,
  findClosestPick: _t,
  destroyMesh: Nt,
  getMeshInstance: Ft,
  getMeshInstanceAsync: Ht,
  isInstancedMesh: Vt,
  pickMeshes: Xt,
  getPolyhedron: Lt,
  updateMesh: R
}, Zt = (e) => new D(e), Yt = (e) => (r) => {
};
async function Kt(e, r = e.name) {
  return await e();
}
const ue = (e) => {
  const r = Yt();
  return new Promise((t, n) => {
    try {
      e.onAfterRenderCameraObservable.addOnce(() => {
        r(), t();
      }), e.render(!0);
    } catch (a) {
      n(a);
    }
  });
}, Jt = (e) => {
  e.debugLayer.isVisible() ? e.debugLayer.hide() : e.debugLayer.show();
}, Qt = {
  createScene: Zt,
  toggleInspector: Jt,
  renderOnce: ue
}, ke = (e) => {
  const r = e.createDefaultEnvironment();
  if (!r)
    throw new Error("Failed to create default environment");
  return r;
}, Oe = async (e, r = {}) => e.createDefaultXRExperienceAsync(r), De = async (e = H()) => {
  const r = Qt.createScene(e), t = oe.getFreeCamera(r, "camera1", {
    position: [0, 5, -10],
    target: [0, 0, 0]
  }), n = e.getRenderingCanvas();
  t.attachControl(n, !0), ce.getHemisphericLight(r, "light1", {
    direction: [0, 1, 0],
    intensity: 0.7
  }), le.getSphere(r, "sphere", {
    radius: 1,
    position: [0, 1, 0]
  });
  const a = ke(r);
  if (!a?.ground)
    throw new Error("Failed to create default environment");
  const o = Oe(r, {
    floorMeshes: [a.ground]
  });
  return e.runRenderLoop(() => {
    r.render();
  }), { scene: r, xr: o };
}, qt = (e = H()) => {
  const r = new D(e), t = e.getRenderingCanvas();
  oe.getArcRotateCamera(r, "Camera", {}).attachControl(t, !0), ce.getHemisphericLight(r, "light1", {
    direction: [1, 1, 1]
  }), le.getSphere(r, "sphere", {
    radius: 0.5
  });
  const a = { debug: !1 };
  return t.onkeyup = (o) => {
    o.ctrlKey && o.keyCode === 73 && (a.debug = !a.debug, a.debug ? r.debugLayer.hide() : (console.log("SHOW!"), r.debugLayer.show()));
  }, e.runRenderLoop(() => {
    r.render();
  }), r;
}, jt = {
  createEngine: H,
  createCanvas: Re,
  v3: y,
  c3: S,
  c4: X,
  helloWorld: qt,
  helloXrWorld: De,
  attachEditorControls: ve
}, er = async ({
  canvas: e,
  ...r
}) => {
  const t = new Ce(e, {
    // powerPreference: "high-performance",
    ...r
  });
  return t.hideLoadingUI(), await t.initAsync(), t;
}, tr = () => Ce.IsSupportedAsync, nn = {
  createWebGlEngine: H,
  createWebGpuEngine: er,
  isWebGpuCapable: tr
}, rr = (e) => {
  console.log("fixing eyelashes", e.meshes), e.meshes.forEach((r) => {
    if (r.name.includes("Eyelashes") && (console.log("fixing eyelashes", r.name), r.name.includes("primitive1"))) {
      console.log("fixing eyelashes: primitive1", r.name);
      const t = r.material;
      if (!t)
        throw new Error("Mesh has no material", { cause: r });
      const n = t.getActiveTextures()[0];
      n.hasAlpha = !0, n.getAlphaFromRGB = !0, t.transparencyMode = 1, t.opacityTexture = n, r.visibility = 0.5, t.albedoColor = new Te(0, 0, 0);
    }
  });
}, nr = [
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
], ar = [
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
], Fe = (e) => {
  const r = e?.material?.getActiveTextures() ?? [];
  if (x(
    r.find((t) => {
      const n = t?.name;
      return x(nr.find((a) => n.includes(a)));
    })
  ) && (e.visibility = 0), x(
    r.find((t) => {
      const n = t?.name;
      return x(ar.find((a) => n.includes(a)));
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
  e.getChildMeshes().map(Fe);
}, or = (e) => {
  console.log("fixing bump maps", e.meshes), e.meshes.forEach((r) => {
    const t = r.material;
    t && (t.bumpTexture = null);
  });
}, sr = (e) => {
  rr(e), e.meshes.map(Fe), or(e);
}, ir = (e) => {
  const { path: r, scene: t, name: n = r instanceof File ? r.name : r } = e;
  return t.getEngine().hideLoadingUI(), new Promise((o, s) => {
    try {
      ge.ShowLoadingScreen = !1, ge.Append(
        "",
        r,
        t,
        (i) => {
          const l = i.getMeshByName("__root__");
          if (!l)
            throw new Error("No root mesh found", { cause: i });
          l.name = n, i.cameras.length > 0 && (i.activeCamera = i.cameras[0]), i.animationGroups.forEach((c) => {
            c.stop();
          }), sr(i), o(l);
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
}, an = {
  renderOnce: ue,
  loadDazFigure: ir
  // fixDazFigure,
  // loadAssetContainer,
  // builder,
}, He = (e, r = e.width, t = e.height) => {
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
}, cr = async (e) => {
  if (typeof e == "string")
    return e;
  const r = document.createElement("canvas");
  return r.width = e.width, r.height = e.height, r.getContext("2d").drawImage(e, 0, 0), await mt.toSrcString(r);
}, Ue = async (e, r, t) => {
  if (t instanceof HTMLCanvasElement)
    return new Promise((a, o) => {
      try {
        const s = new ae(r, t, e);
        s.update(), s.hasAlpha = !0, a(s);
      } catch (s) {
        o(s);
      }
    });
  const n = await cr(t);
  return new Promise((a, o) => {
    try {
      const s = new B(n, e, !1, !0);
      s.name = r, s.hasAlpha = !0, s.onLoadObservable.addOnce(() => {
        a(s);
      });
    } catch (s) {
      o(s);
    }
  });
}, lr = async (e, r) => {
  const t = Ee.randomUuid(), { size: n, image: a, color: o } = e, s = v.CreatePlane(
    `plane-${t}`,
    {
      width: n,
      height: n
    },
    r
  ), i = new F(`material-${t}`, r);
  if (x(a)) {
    const l = await Ue(r, `layer-${t}`, a);
    e._texture = l, e._mesh = s, e._material = i, l.hasAlpha = !0, i.opacityTexture = l, i.emissiveTexture = l;
  }
  return x(o) && (i.emissiveColor = S(o)), s.material = i, s;
}, ur = async (e, r) => {
  const t = new D(r);
  return await Promise.all(
    e.map(async (n, a) => {
      const o = await lr(n, t);
      return o.position.set(0, 0, -a), o;
    })
  ), t;
}, dr = ({ size: e } = { size: 4096 }) => {
  const r = H({ width: e, height: e }), t = r.getRenderingCanvas(), n = {
    layers: []
  }, a = {
    addLayer: (o) => (n.layers.push({ size: e, ...o }), a),
    render: async () => Kt(async () => {
      const o = await ur(n.layers, r), s = new te("camera1", y(0, 0, -1e3), o);
      if (s.setTarget(y()), s.rotation = y(0, 0, Math.PI), s.mode = O.ORTHOGRAPHIC_CAMERA, s.minZ = 0, s.maxZ = 1e5, await ue(o), a.clear(), !t)
        throw new Error("No canvas found", { cause: r });
      return He(t);
    }, "Texture render"),
    clear: () => (n.layers.forEach((o) => {
      o?._cached || (o?._texture?.dispose(), o?._mesh?.dispose(), o?._material?.dispose());
    }), n.layers.length = 0, a)
  };
  return a;
}, de = (e, r) => {
  const t = e.getSize(), n = e.getContext();
  r(n, t), e.update();
}, hr = (e) => {
  de(e, (r, t) => {
    const { width: n, height: a } = t;
    r.clearRect(0, 0, n, a);
  });
}, gr = (e, r = "DEBUG IMAGE") => {
  const t = We.copyToCanvas(e, 1024, 1024);
  t.style.border = "1px solid grey";
  const n = document.createElement("div");
  return n.textContent = r, document.body.appendChild(n), document.body.appendChild(t), new Promise((a, o) => {
    const s = () => {
      t.remove(), n.remove(), a(void 0);
    };
    t.onclick = s, n.onclick = s;
  });
}, fr = (e, r) => {
  const t = e.getTextureByName(r);
  t && (t.dispose(), e.removeTexture(t));
}, pr = (e, r = {}) => {
  const { color: t = "black" } = r;
  de(e, (n, a) => {
    const { width: o, height: s } = a;
    n.fillStyle = E.from(t).toString(), n.fillRect(0, 0, o, s);
  });
}, mr = (e, r, t = {}) => {
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
    const { x: T, y: I, width: K, height: he } = M;
    d.fillRect(T, I, K, he);
  }
  return a && (d.strokeStyle = l, d.strokeText(r, u, m)), d.fillStyle = o, d.fillText(r, u, m), e.hasAlpha = !0, e.update(), M;
}, $e = {
  linearNearest: B.LINEAR_NEAREST,
  nearestNearest: B.NEAREST_NEAREST,
  linearLinear: B.LINEAR_LINEAR,
  nearestLinear: B.NEAREST_LINEAR
}, Z = (e, r, t) => {
  const n = e.getTextureByName(r);
  return x(n) ? n : t();
}, Y = (e, r) => {
  const { hasAlpha: t } = r;
  w(t, (n) => {
    e.hasAlpha = n;
  }), e instanceof ae && e.update();
}, yr = (e, r, t = {}) => {
  const n = Z(e, r, () => {
    const {
      generateMipMaps: a = !0,
      samplingMode: o = "linearNearest",
      width: s = 1024,
      height: i = 1024,
      init: l
    } = t, c = new ae(
      r,
      {
        width: s,
        height: i
      },
      e,
      a,
      $e[o]
    );
    return l && (l(c.getContext()), c.update()), c;
  });
  return Y(n, t), n;
}, Ge = (e) => $e[e], xr = (e, r, t) => Z(e, r, () => {
  const {
    element: n,
    generateMipMaps: a = !0,
    samplingMode: o = "linearNearest"
  } = t;
  if (!n)
    throw new Error("HTML element is required to create texture", {
      cause: t
    });
  const s = new nt(r, n, {
    generateMipMaps: a,
    samplingMode: Ge(o),
    engine: e.getEngine(),
    scene: e
  });
  return Y(s, t), s;
}), wr = (e, r, t) => {
  const n = Z(e, r, () => {
    const {
      src: a,
      generateMipMaps: o = !0,
      samplingMode: s = "linearNearest"
    } = t;
    if (!a)
      throw new Error("src is required", { cause: t });
    const i = new B(a, e, {
      samplingMode: Ge(s)
    });
    return i.name = r, i;
  });
  return Y(n, t), n;
}, We = {
  builder: dr,
  copyToCanvas: He,
  debugImage: gr,
  getTexture: Z,
  getHtmlElementTexture: xr,
  getDynamicTexture: yr,
  getPathTexture: wr,
  updateTexture: Y,
  imageToTexture: Ue,
  drawTextOnTexture: mr,
  drawOnTexture: de,
  drawBackgroundOnTexture: pr,
  clearTexture: hr,
  destroyTexture: fr
}, Mr = (e, r, t) => {
  const n = e?.effectLayers?.length ? e.getGlowLayerByName(r) : void 0;
  return x(n) ? n : new Se(r, e, t);
}, br = (e, r, t) => {
  const n = e.getHighlightLayerByName(r);
  return x(n) ? n : new at(r, e, t);
}, on = {
  getGlowLayer: Mr,
  getHighlightLayer: br
}, Ve = {
  getMaterial: G,
  updateMaterial: q,
  updateStandardMaterial: Ae
}, Tr = (e, r) => {
  const t = e.getTransformNodeByName(r);
  return x(t) ? t : new ot(r, e);
}, sn = {
  getTransformNode: Tr
}, Cr = (e) => {
  const r = e.metadata ?? {}, t = r.solidParticleSystems ?? {};
  return x(t) || (e.metadata = {
    ...r,
    solidParticleSystems: {}
  }), t;
}, ze = (e, r, t) => {
  const n = Cr(e), a = n[r];
  x(a);
  const o = t();
  return n[r] = o, o;
}, Sr = (e, r, t) => ze(e, r, () => new ne(r, e, {
  ...t
})), Er = (e, r, t = {}) => {
  const n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), { material: l, onMeshBuild: c, ...p } = t;
  let g;
  const d = () => {
    g?.mesh?.dispose(!1), g = new ne(r, e, {
      ...p
    });
  };
  d();
  const f = {
    scene: e,
    clearParticles: () => {
      g.particles.forEach((u, h) => {
        u.color = ye;
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
        l && (u.material = Ve.getMaterial(e, l)), c?.(u);
      } catch (u) {
        console.error(u);
      }
    },
    syncParticlestoMeshes: () => {
      o.forEach((u, h) => {
        for (let m = 0; m < u.length; m++) {
          const M = u[m], T = _.assertValue(g.particles[M]);
          if (T.position.copyFrom(h.position), T.rotation.copyFrom(h.rotation), T.scaling.copyFrom(h.scaling), h.material instanceof F) {
            const I = h.material.diffuseColor;
            T.color = new z(I.r, I.g, I.b, h.material.alpha);
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
        u.alive = !1, u.color = ye;
      });
    }
  };
  return f;
}, ye = new z(0, 0, 0, 0), Pr = {
  getSolidParticleSystem: Sr,
  getParticleSystem: ze,
  Sps: Er
}, vr = (e, r, t) => new st(y(e), y(r), t), Rr = (e, r, t = {}) => {
  const {
    trianglePredicate: n,
    fastCheck: a,
    predicate: o = (s) => s.isPickable
  } = t;
  return e.pickWithRay(r, o, a, n);
}, cn = {
  createRay: vr,
  pickWithRay: Rr
}, Ar = (e) => {
  const r = e.getScene();
  e.dispose(), r.getLightsByTags("shadowCaster").forEach((n) => {
    n.metadata.shadowGenerator.removeShadowCaster(e);
  });
}, Ir = (e) => (e.getScene().getLightsByTags("shadowCaster").forEach((n) => {
  n.metadata.shadowGenerator.addShadowCaster(e);
}), () => {
  Ar(e);
}), ln = {
  addShadowToMesh: Ir
}, Lr = (e, r, t = {}) => {
  const n = new Se(r, e, t);
  return n.neutralColor = new z(0, 0, 0, 0), n;
}, un = {
  addGlowLayer: Lr,
  Constants: it
};
async function Br({
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
    const f = d.endsWith(".png") ? d : `${d}.png`, u = await Nr(`${e}/${f}`), h = u.width + n * 2, m = u.height + n * 2;
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
async function Nr(e) {
  return new Promise((r, t) => {
    const n = new Image();
    n.src = e, n.onload = () => r(n), n.onerror = (a) => t(new Error(`Failed to load image: ${e}`));
  });
}
const _r = (e, r, t = {}) => {
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
    return new ct(
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
}, Xe = (e, r, t = {}) => {
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
    return new lt(
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
}, kr = (e, r, t) => {
  const n = pt(Xe(e, t)), a = n?.sprites?.find((o) => o.name === r);
  return x(a) ? a : new ut(r, n);
}, dn = {
  getSpriteManager: Xe,
  getSprite: kr,
  createTextureAtlas: Br,
  getSpritePackedManager: _r
}, Or = (e, r = {}) => {
  const {
    random: t = Ee.globalRandom,
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
    const p = c / a, g = e.position, [d, f, u] = k(g), h = (Je) => (t() * n * 2 - n) * (p / 4) + Je, [m, M] = [h(d), h(f)], T = y([m, M, o]), [I, K, he] = k(V.midPoint3(g, T)), Ze = y(I, K, u - t() * p * 3), Ye = {
      path: dt.CreateCatmullRomSpline([g, Ze, T], s).getPoints().reverse(),
      bounces: c - 1
      // rotationAxis: [2 * random() - 1, 2 * random() - 1, 2 * random() - 1],
    }, Ke = e.props ?? {};
    e.props = { ...Ke, ...Ye };
  }
};
class L {
  /**
   * Evaluate a query
   * @param query defines the query to evaluate
   * @param evaluateCallback defines the callback used to filter result
   * @returns true if the query matches
   */
  static Eval(r, t) {
    return r.match(/\([^()]*\)/g) ? r = r.replace(/\([^()]*\)/g, (n) => (n = n.slice(1, n.length - 1), L._HandleParenthesisContent(n, t))) : r = L._HandleParenthesisContent(r, t), r === "true" ? !0 : r === "false" ? !1 : L.Eval(r, t);
  }
  static _HandleParenthesisContent(r, t) {
    t = t || ((o) => o === "true");
    let n;
    const a = r.split("||");
    for (const o in a)
      if (Object.prototype.hasOwnProperty.call(a, o)) {
        let s = L._SimplifyNegation(a[o].trim());
        const i = s.split("&&");
        if (i.length > 1)
          for (let l = 0; l < i.length; ++l) {
            const c = L._SimplifyNegation(i[l].trim());
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
    return t === void 0 ? !0 : t === "" ? C.HasTags(r) : L.Eval(t, (n) => C.HasTags(r) && r._tags[n]);
  }
}
const Dr = (e, r, t) => {
  const { XYZI: n, RGBA: a } = r, o = a.map((i) => {
    const { r: l, g: c, b: p, a: g } = i;
    return E.builder({ color: [l, c, p, g], model: "rgba" }).toString();
  }), s = new A(t, e);
  return n.map((i, l) => {
    const c = o[i.i], p = Le(e, `voxel-${c}`, {
      color: c,
      material: `voxel-material-${c}`
    });
    return p.position = y(i), p.parent = s, p;
  }), C.AddTagsTo(s, "complex"), s;
}, Fr = (e) => {
  const r = Object.entries(e).sort((t, n) => {
    const [a] = t, [o] = n;
    return a.localeCompare(o);
  });
  return JSON.stringify(r);
}, Hr = (e) => {
  const r = {};
  return e.forEach((t) => {
    const n = t?.material?.name;
    if (!n)
      throw new Error("Mesh material is missing name", { cause: t });
    const a = r[n] ?? [];
    a.push(t), r[n] = a;
  }), r;
}, Ur = (e, r, t) => {
  const { XYZI: n, RGBA: a } = r, o = a.map((d) => {
    const { r: f, g: u, b: h, a: m } = d;
    return E.builder({ color: [f, u, h, m], model: "rgba" }).toString();
  }), s = n.map((d, f) => {
    const u = o[d.i], [h, m, M] = k(d), T = Ie(
      e,
      `voxel-merged-${u}-${Fr(d)}`,
      {
        position: [h, m, M],
        // color,
        // material: `voxel-merged-material-${color}`,
        material: "voxel-material",
        colors: ft.from(6).map(() => u)
      }
    );
    return T.setEnabled(!1), T;
  }), i = Hr(s), l = Object.values(i).map((d) => Ne(d)), c = new A(`merged-${t}`, e);
  l.filter(x).forEach((d) => d.parent = c);
  const p = G(e, "voxel-material", "standard");
  l.filter(x).forEach((d) => d.material = p), c.metadata = {
    voxels: s
  }, C.AddTagsTo(c, "merged");
  const g = new A(t, e);
  return g.metadata = {
    voxels: s
  }, c.parent = g, g;
}, hn = {
  animateExplosion: Or,
  voxDataToSps: Be,
  voxDataToMergedModel: Ur,
  voxDataToComplexModel: Dr
}, $r = (e) => new b.WebXRSessionManager(e), gn = {
  createWebXrSessionManager: $r,
  helloXrWorld: De,
  createDefaultEnvironment: ke,
  createWebXrExperience: Oe
}, Gr = ({
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
}, Wr = ({
  engine: e,
  canvas: r
}) => {
  const t = new b.Scene(e);
  console.log(t), oe.getArcRotateCamera(t, "ArcRotateCamera", {
    alpha: -Math.PI / 2,
    beta: Math.PI / 2.2,
    radius: 50,
    target: [0, 0, 0]
  }).attachControl(r, !0), ce.getHemisphericLight(t, "light", {
    direction: [0, 1, -1]
  });
  const a = We.getPathTexture(t, "tex", {
    src: "/images/test.jpg"
  }), o = Ve.getMaterial(t, "mat", {
    opacityTexture: a.name
    // diffuseColor: Colors.from("red").alpha(0.99).toString(),
    // alpha: 0.99,
  }), s = le.getBox(
    t,
    "box1"
    //  { material: mat.name }
  ), i = Pr.Sps(t, "sps", {
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
    const c = Math.sin(Date.now() * 5e-3), p = yt.noiseStream(0);
    i.updateParticlesByName("box1", (g, d) => {
      g.color = new b.Color4(p(), p(), p(), 0.5), Math.random() > 0.5 ? g.rotation.x = p() * c : g.rotation.y = p() * c;
    }), i.update();
  } };
}, fn = {
  spsDebug: Gr,
  spsDebug2: Wr
};
export {
  jt as Babs,
  me as CAMERA_MODES,
  oe as Cameras,
  fn as Debugs,
  nn as Engines,
  on as Layers,
  ce as Lights,
  Ve as Materials,
  le as Meshes,
  an as Models,
  sn as Nodes,
  Pr as Particles,
  cn as Rays,
  Qt as Scenes,
  ln as Shadows,
  un as Specials,
  dn as Sprites,
  We as Textures,
  hn as Voxels,
  gn as Wxrs,
  Lr as addGlowLayer
};
//# sourceMappingURL=index.js.map
