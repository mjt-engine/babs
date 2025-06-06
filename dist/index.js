import { Inputs as V } from "@mjt-engine/input";
import { toVec3 as D, Maths as $, toVec2 as me } from "@mjt-engine/math";
import * as w from "@babylonjs/core";
import { Vector3 as K, Engine as Ke, Color3 as ye, Color4 as z, Matrix as we, Scene as H, UniversalCamera as ee, Camera as k, TargetCamera as Je, ArcRotateCamera as te, HemisphericLight as xe, PointLight as Me, StandardMaterial as F, PBRMaterial as Qe, Mesh as A, MeshBuilder as P, SolidParticleSystem as re, InstancedMesh as qe, Texture as L, WebGPUEngine as be, SceneLoader as de, DynamicTexture as ae, HtmlElementTexture as je, GlowLayer as Ce, HighlightLayer as et, TransformNode as tt, Ray as rt, Constants as at, SpritePackedManager as nt, SpriteManager as ot, Sprite as st, Curve3 as it } from "@babylonjs/core";
import * as O from "@babylonjs/gui";
import { Colors as E } from "@mjt-engine/color";
import { isUndefined as N, isDefined as x, iff as M, tuple2 as ct, tuple3 as lt, Arrays as ut } from "@mjt-engine/object";
import { extent as he } from "d3-array";
import { Asserts as _, assertValue as dt } from "@mjt-engine/assert";
import { Randoms as Te } from "@mjt-engine/random";
import { Images as ht } from "@mjt-engine/image";
import "@babylonjs/inspector";
import { Noises as ft } from "@mjt-engine/noise";
function y(e = 0, r = 0, t = 0) {
  if (typeof e == "number")
    return new K(e, r, t);
  const [a = 0, n = 0, o = 0] = D(e);
  return new K(a, n, o);
}
const Se = (e, r) => {
  const t = e.alpha, a = e.beta, n = e.radius;
  e.target = e.target.add(y(r)), e.radius = n, e.alpha = t, e.beta = a;
}, Ee = (e, r = {}) => {
  const {
    keySensitivity: t = 0.5,
    mouseSensitivity: a = 0.05,
    parent: n = document.body,
    action: o = () => {
    }
  } = r, s = e.alpha, i = e.beta, u = e.radius;
  y(e.target);
  const c = (h = 0, l = 0, f = 0) => {
    Se(e, [h, l, f]), o();
  }, p = V.listenToKey(
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
        e.alpha = s, e.beta = i, e.radius = u, o();
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
      parent: n
    }
  ), g = {
    lastPosition: void 0
  };
  n.addEventListener("pointerdown", (h) => {
    h.buttons === 4 && (g.lastPosition = h);
  }), n.addEventListener("pointermove", (h) => {
    if (h.buttons !== 4)
      return;
    const { lastPosition: l = h } = g;
    g.lastPosition = h;
    const f = $.subtract2(l, h), [m, b] = me(f);
    if (h.buttons === 4 && h.shiftKey) {
      e.beta = e.beta + b * a;
      return;
    }
    h.buttons === 4 && (c(b * a, -b * a, 0), c(m * a, m * a, 0));
  });
  const d = V.listenToMouse(
    {
      wheel: (h) => {
        if (h instanceof WheelEvent) {
          const l = h.deltaY * a;
          e.radius += l, o();
        }
      }
    },
    {
      parent: n
    }
  );
  return [p, d];
}, ve = ({
  width: e = 320,
  height: r = 320
}) => {
  const t = document.createElement("canvas");
  return t.width = e, t.height = r, t;
}, G = (e) => {
  const r = e instanceof HTMLCanvasElement || e instanceof OffscreenCanvas ? {} : e ?? {}, t = e instanceof HTMLCanvasElement || e instanceof OffscreenCanvas ? e : ve({
    width: e?.width ?? 320,
    height: e?.height ?? 320
  }), { antialias: a } = r, n = new Ke(t, a, {
    powerPreference: "high-performance",
    ...r
  });
  return n.hideLoadingUI(), n;
}, gt = (e = G()) => {
  var r = new w.Scene(e), t = w.Mesh.CreateIcoSphere(
    "sphere",
    { radius: 0.2, flat: !0, subdivisions: 1 },
    r
  );
  t.position.y = 3;
  const a = new w.StandardMaterial("sphere material", r);
  t.material = a;
  var n = new w.DirectionalLight(
    "light",
    new w.Vector3(0, -0.5, 1),
    r
  );
  n.position = new w.Vector3(0, 5, -2);
  var o = new w.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 4,
    3,
    new w.Vector3(0, 3, 0),
    r
  );
  const s = e.getRenderingCanvas();
  if (o.attachControl(s, !0), !o)
    throw new Error("Failed to create ArcRotateCamera");
  o.beta += 0.8;
  var i = r.createDefaultEnvironment({
    enableGroundShadow: !0,
    groundYBias: 2.8
  });
  if (!i)
    throw new Error("Failed to create default environment");
  i.setMainColor(w.Color3.FromHexString("#74b9ff"));
  var u = new w.ShadowGenerator(1024, n);
  u.useBlurExponentialShadowMap = !0, u.blurKernel = 32, u.addShadowCaster(t, !0);
  var c = r.createDefaultVRExperience({
    createDeviceOrientationCamera: !1,
    useXR: !0
  });
  if (!c)
    throw new Error("Failed to create VR experience");
  if (!i.ground)
    throw new Error("Default environment does not have a ground mesh");
  c.enableTeleportation({ floorMeshes: [i.ground] }), r.onBeforeRenderObservable.add(() => {
    t.rotation.y += 1e-4 * r.getEngine().getDeltaTime(), t.rotation.x += 1e-4 * r.getEngine().getDeltaTime();
  });
  var p = w.Mesh.CreatePlane("plane", 1, r);
  p.position = new w.Vector3(0.4, 4, 0.4);
  var g = O.AdvancedDynamicTexture.CreateForMesh(p), d = new O.StackPanel();
  g.addControl(d);
  var h = new O.TextBlock();
  h.text = "Color GUI", h.height = "100px", h.color = "white", h.textHorizontalAlignment = O.Control.HORIZONTAL_ALIGNMENT_CENTER, h.fontSize = "120", d.addControl(h);
  var l = new O.ColorPicker();
  return l.value = a.diffuseColor, l.horizontalAlignment = O.Control.HORIZONTAL_ALIGNMENT_CENTER, l.height = "350px", l.width = "350px", l.onValueChangedObservable.add(function(f) {
    a.diffuseColor.copyFrom(f);
  }), d.addControl(l), c.onAfterEnteringVRObservable.add(() => {
    r.activeCamera === c.vrDeviceOrientationCamera && w.FreeCameraDeviceOrientationInput.WaitForOrientationChangeAsync(
      1e3
    ).then(() => {
    }).catch(() => {
      alert(
        "Device orientation camera is being used but no sensor is found, prompt user to enable in safari settings"
      );
    });
  }), r;
}, S = (e) => {
  const r = E.builder({ color: e }).hex();
  return ye.FromHexString(r);
}, W = (e) => {
  const r = E.builder({ color: e }), t = z.FromHexString(r.hex());
  return t.a = r.alpha(), t;
}, fe = (e, r, t, a = {}) => {
  const { camera: n = e.activeCamera, predicate: o = () => !0 } = a, s = e.createPickingRay(r, t, we.Identity(), n);
  return e.pickWithRay(s, o)?.pickedMesh;
}, J = (e, r) => {
  if (e instanceof H)
    return e.meshes.forEach((t) => J(t, r));
  r(e), e.getChildMeshes().forEach((t) => J(t, r));
}, pt = (e, r = {}) => {
  const {
    keySensitivity: t = 0.05,
    mouseSensitivity: a = 0.05,
    parent: n = document.body
  } = r;
  V.listenToKey(
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
      parent: n
    }
  ), V.listenToMouse(
    {
      wheel: (o) => {
        if (o instanceof WheelEvent) {
          if (o.shiftKey) {
            const i = o.deltaX * a;
            e.position.addInPlace(y(0, -i, 0));
            return;
          }
          const s = o.deltaY * a;
          e.position.addInPlace(y(0, 0, s));
        }
      },
      click: (o) => {
        if (o.buttons === 0) {
          const s = o, i = e.getScene(), u = fe(i, s.layerX, s.layerY);
          x(u) && (console.log({ mesh: u }), J(i, (c) => {
            N(c.material) || c.material && (c.material.wireframe = !1);
          }), u.material && (u.material.wireframe = !0));
        }
      },
      auxclick: (o) => {
        if (o.button !== 1)
          return;
        const s = e.getScene(), i = fe(s, o.clientX, o.clientY);
        N(i);
      },
      contextmenu: (o) => {
        console.log("should context");
      }
    },
    {
      propagate: !1,
      parent: n
    }
  );
}, mt = (e, r, {
  unitsTall: t = 1,
  unitsWide: a = 1,
  cameraLevel: n = -100,
  disposeActive: o = !1
} = {}) => {
  o && e?.activeCamera?.dispose();
  const s = new ee(r, y(0, 0, n), e);
  return s.target = y(0, 0, 0), s.rotation = y(0, 0, Math.PI), s.orthoTop = -t / 2, s.orthoBottom = t / 2, s.orthoLeft = a / 2, s.orthoRight = -a / 2, s.mode = k.ORTHOGRAPHIC_CAMERA, s;
}, ne = (e, r, t) => {
  const a = e.getCameraByName(r);
  return x(a) ? a : t();
}, oe = (e, r) => {
  const {
    alpha: t,
    beta: a,
    radius: n,
    target: o,
    position: s,
    rotation: i,
    minZ: u,
    maxZ: c,
    mode: p,
    orthoTop: g,
    orthoBottom: d,
    orthoLeft: h,
    orthoRight: l
  } = r;
  M(s, (f) => {
    e.position = y(f);
  }), M(u, (f) => {
    e.minZ = f;
  }), M(c, (f) => {
    e.maxZ = f;
  }), M(p, (f) => {
    e.mode = ge[f];
  }), M(p, (f) => {
    e.mode = ge[f];
  }), M(g, (f) => {
    e.orthoTop = f;
  }), M(d, (f) => {
    e.orthoBottom = f;
  }), M(h, (f) => {
    e.orthoLeft = f;
  }), M(l, (f) => {
    e.orthoRight = f;
  }), e instanceof Je && (M(i, (f) => {
    e.rotation = y(f);
  }), M(o, (f) => {
    e.target = y(f);
  })), e instanceof te && (M(t, (f) => {
    e.alpha = f;
  }), M(a, (f) => {
    e.beta = f;
  }), M(n, (f) => {
    e.radius = f;
  }));
}, yt = (e, r, t = {}) => {
  const a = ne(e, r, () => {
    const { alpha: n = 0, beta: o = 0, radius: s = 2, target: i } = t;
    return new te(r, n, o, s, y(i), e);
  });
  return oe(a, t), a;
}, wt = (e, r, t = {}) => {
  const a = ne(e, r, () => {
    const { position: n } = t;
    return new ee(r, y(n), e);
  });
  return oe(a, t), a;
}, xt = (e, r) => {
  e?.activeCamera?.dispose();
  const t = e.getEngine().getRenderingCanvas(), a = -Math.PI / 2, n = Math.PI / 2.5, o = new te(r, a, n, 15, y(0, 0, 0), e);
  o.attachControl(t, !0), o.mode = k.PERSPECTIVE_CAMERA;
}, ge = {
  orthographic: k.ORTHOGRAPHIC_CAMERA,
  perspective: k.PERSPECTIVE_CAMERA
}, Pe = {
  getArcRotateCamera: yt,
  getCamera: ne,
  updateCamera: oe,
  getUniversalCamera: wt,
  attachArcRotateCameraControls: Ee,
  attachUniversalCameraControls: pt,
  createTopDownCamera: mt,
  createDebugCamera: xt
}, se = (e, r, t) => {
  const a = e.getLightByName(r);
  return x(a) ? a : t();
}, ie = (e, r) => {
  const { intensity: t, direction: a, position: n } = r;
  M(t, (o) => {
    e.intensity = o;
  }), e instanceof xe && M(a, (o) => {
    e.direction = y(o);
  }), e instanceof Me && M(n, (o) => {
    e.position = y(o);
  });
}, Mt = (e, r, t = {}) => {
  const a = se(e, r, () => {
    const { direction: n } = t;
    return new xe(r, y(n), e);
  });
  return ie(a, t), a;
}, bt = (e, r, t = {}) => {
  const a = se(e, r, () => {
    const { position: n } = t;
    return new Me(r, y(n), e);
  });
  return ie(a, t), a;
}, Re = {
  getLight: se,
  getHemisphericLight: Mt,
  getPointLight: bt,
  updateLight: ie
}, v = (e, r, t, a = !1) => {
  const n = e.getMeshByName(r);
  return x(n) && !a ? n : x(n) && a ? t(n) : t();
}, Ae = (e, r, t) => {
  const {
    alpha: a,
    diffuseTexture: n,
    emissiveTexture: o,
    ambientTexture: s,
    opacityTexture: i,
    diffuseColor: u,
    specularColor: c,
    ambientColor: p,
    emissiveColor: g
  } = t;
  M(n, (d) => {
    const h = e.getTextureByName(d);
    r.diffuseTexture = h;
  }), M(o, (d) => {
    const h = e.getTextureByName(d);
    r.emissiveTexture = h;
  }), M(s, (d) => {
    const h = e.getTextureByName(d);
    r.ambientTexture = h;
  }), M(i, (d) => {
    const h = e.getTextureByName(d);
    r.opacityTexture = h;
  }), M(u, (d) => {
    r.diffuseColor = S(d);
    const h = E.from(d).alpha();
    h < 1 && (r.alpha = h);
  }), M(c, (d) => {
    r.specularColor = S(d);
  }), M(p, (d) => {
    r.ambientColor = S(d);
  }), M(g, (d) => {
    r.emissiveColor = S(d);
  }), M(a, (d) => {
    r.alpha = d;
  });
}, Q = (e, r, t) => {
  r instanceof F && Ae(e, r, t);
}, U = (e, r, t = "standard") => {
  const a = e.getMaterialByName(r);
  if (x(a))
    return a;
  const n = typeof t == "string" ? t : t?.type ?? "standard";
  switch (n) {
    case "standard": {
      const o = new F(r, e);
      return Q(e, o, t), o;
    }
    case "pbr": {
      const o = new Qe(r, e);
      return Q(e, o, t), o;
    }
    default:
      throw new Error(`Unknown material type: '${n}'`);
  }
}, R = (e, r, t) => {
  const { position: a, color: n, material: o, receiveShadows: s } = t;
  r instanceof A && x(o) && (r.material = U(e, o, "standard")), r instanceof A && x(s) && (r.receiveShadows = s), M(a, (i) => {
    r.position = y(i);
  }), M(n, (i) => {
    const u = r.material;
    if (u instanceof F) {
      u.diffuseColor = S(i);
      const c = E.from(i).alpha();
      c < 1 && (u.alpha = c), u.specularColor = S("black"), u.ambientColor = S(i), u.emissiveColor = S(i);
    }
  });
}, Ie = (e, r, t = {}) => v(e, r, () => {
  const { width: a = 1, height: n = 1, depth: o = 1, colors: s } = t, i = P.CreateBox(
    r,
    {
      width: a,
      height: n,
      depth: o,
      faceColors: x(s) ? s.map(W) : void 0
    },
    e
  );
  return R(e, i, t), i;
}), Be = (e, r, t) => {
  const {
    width: a = 1,
    height: n = 1,
    depth: o = 1,
    material: s,
    receiveShadows: i = !1
  } = t, u = `box-instance-root-${JSON.stringify([
    a,
    n,
    o,
    s,
    i
  ])}`;
  let c = e.getMeshByName(u);
  if (N(c)) {
    if (c = P.CreateBox(u, { width: a, height: n, depth: o }, e), c.receiveShadows = i, c.isVisible = !1, !s)
      throw new Error("No material", { cause: t });
    c.material = U(e, s, "standard");
  }
  const p = c.createInstance(r);
  return R(e, p, t), p;
}, Ct = (e, r, t) => {
  const { radius: a = 0.5 } = t;
  return v(e, r, () => {
    const n = P.CreateSphere(
      r,
      { diameter: a * 2 },
      e
    );
    return R(e, n, t), n;
  });
}, Tt = (e, r, t, a = {}) => {
  const {
    predicate: n = (u) => u.isPickable,
    camera: o = e.activeCamera
  } = a, s = e.createPickingRay(r, t, we.Identity(), o);
  return e.pickWithRay(s, n)?.pickedMesh;
}, St = (e) => {
  e.computeWorldMatrix(!0), e.refreshBoundingInfo({});
  const [r, t, a] = D(e.getAbsolutePosition()), n = e.getBoundingInfo().boundingSphere.radius;
  return [r, t, a - n];
}, q = (e, r) => {
  if (e instanceof H)
    return e.meshes.forEach((t) => q(t, r));
  r(e), e.getChildMeshes().forEach((t) => q(t, r));
}, Et = {
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
}, vt = (e, r, t = {}) => v(e, r, () => {
  const { size: a = 1, type: n = "tetrahedron" } = t, o = P.CreatePolyhedron(
    r,
    { type: Et[n], size: a },
    e
  );
  return R(e, o, t), o;
}), Pt = (e) => {
  const r = e.getBoundingInfo().boundingBox.vectors, t = e.getScene(), a = t.getEngine().getRenderingCanvas();
  if (!a)
    throw new Error("No canvas for scene", { cause: t });
  const n = e.getWorldMatrix(), o = t.getTransformMatrix(), s = t.activeCamera.viewport, i = r.map((h) => {
    const l = K.Project(h, n, o, s);
    return l.x = l.x * a.clientWidth, l.y = l.y * a.clientHeight, l;
  }), [u, c] = he(i, (h) => h.x), [p, g] = he(i, (h) => h.y);
  return {
    width: c - u,
    height: g - p,
    left: u,
    top: p,
    right: c,
    bottom: g
  };
}, Rt = (e, r, t = {}) => {
  const {
    recurse: a = !0,
    disposeMaterials: n = !1,
    disposeTextures: o = !1
  } = t, s = e.getMeshByName(r);
  if (s) {
    if (s.dispose(!a, !1), n) {
      const i = s.material;
      if (!i)
        return;
      i.name = `DISPOSED-${i.name}`, i?.dispose(!0, o), e.removeMaterial(i);
    }
    e.removeMesh(s);
  }
}, At = (e) => {
  if (!N(e))
    return e.sort((r, t) => r.distance - t.distance), e[0];
}, It = (e, r, t = {}) => v(e, r, () => {
  const { arc: a = 1, height: n = 1, radius: o = 0.5, tag: s } = t, i = P.CreateCylinder(
    r,
    {
      height: n,
      arc: a,
      diameter: o * 2
    },
    e
  );
  return R(e, i, t), i;
}), Bt = (e, r, t) => {
  const { updatable: a = !1 } = t;
  return v(
    e,
    r,
    (n) => Lt(e, r, {
      ...t,
      instance: n
      // updatable: undefined,
    }),
    a
  );
}, Lt = (e, r, t) => {
  const {
    colors: a = [],
    points: n = [],
    color: o = "white",
    updatable: s = !1,
    useVertexAlpha: i,
    instance: u
  } = t, c = n.map((d, h) => a[h] ?? o).map((d) => W(d)), p = n.map((d) => y(d)), g = P.CreateLines(r, {
    points: p,
    colors: c,
    updatable: s,
    useVertexAlpha: i,
    instance: u
  });
  return R(e, g, t), g;
}, j = (e, r, t) => {
  const a = e.getMeshByName(r);
  return x(a) ? Promise.resolve(a) : t();
}, Nt = (e, r, t, a) => v(e, r, () => {
  const n = v(e, t, a);
  return _.assertValue(n, () => (console.log({ scene: e, name: r, rootName: t, producer: a }), "Unable to create mesh instance. Missing root mesh.")), n.createInstance(r);
}), Ot = async (e, r, t, a) => j(e, r, async () => {
  const n = await j(e, t, a);
  return _.assertValue(n, () => (console.log({ scene: e, name: r, rootName: t, producer: a }), "Unable to create mesh instance. Missing root mesh.")), n.createInstance(r);
}), _t = (e, r, t = {}) => v(e, r, () => {
  const { width: a = 1, height: n = 1, tag: o, doubleSided: s } = t, i = P.CreatePlane(
    r,
    {
      width: a,
      height: n,
      sideOrientation: s ? A.DOUBLESIDE : void 0
    },
    e
  ), { billboard: u } = t;
  return u && (i.billboardMode = A.BILLBOARDMODE_ALL), R(e, i, t), i;
}), Dt = (e, r, t = {}) => v(e, r, () => {
  const { radius: a = 0.5 } = t, n = P.CreateTorusKnot(r, { radius: a }, e);
  return R(e, n, t), n;
}), kt = (e) => {
  const { XYZI: r, SIZE: t } = e, a = t.z, n = 1 / a / 2, o = 1 / a / 2, s = 1 / a / 2;
  return r.map((i) => {
    const [u, c, p] = D(i), g = (u - t.x / 2) / a + n, d = (c - t.y / 2) / a + o, h = (p - t.z / 2) / -a - s;
    return ct(lt(g, d, h), i.i);
  });
}, Le = (e, r, t) => {
  const { XYZI: a, RGBA: n, SIZE: o } = r, s = n.map((g) => {
    const { r: d, g: h, b: l, a: f } = g;
    return E.builder({ color: [d, h, l, f], model: "rgba" }).toString();
  }), i = new re(t, e), u = 1 / o.z, c = P.CreateBox("temp-box", {
    width: u,
    height: u,
    depth: u
  });
  i.addShape(c, a.length), i.buildMesh(), c.dispose(), kt(r).forEach((g, d) => {
    const [h, l] = g, f = i.particles[d];
    f.position = y(h);
    const m = s[l];
    f.color = W(m);
  });
  const p = U(e, "vox-material", "standard");
  return p.specularColor = S("black"), i.mesh.material = p, i.setParticles(), i;
}, Ht = (e, r, t, a = {}) => {
  const n = e.metadata ?? {}, { voxes: o = {} } = n, s = o[t];
  if (N(s))
    throw console.log({ scene: e, name: r, src: t }), new Error(`No voxData found for ${t} ${r}`);
  const i = Le(e, s, r), u = i.mesh;
  return R(e, u, a), i;
}, Ft = (e) => e instanceof qe, Gt = (e, r) => {
  const [t, a] = me($.normalize2($.subtract2(r, e)));
  return Math.atan2(a, t) + Math.PI / 2;
}, Ne = (e, r = {}) => {
  const {
    disposeSource: t = !1,
    allow32BitsIndices: a = !0,
    meshSubclass: n = void 0,
    subdivideWithSubMeshes: o = !1,
    multiMultiMaterials: s = !1
  } = r;
  return A.MergeMeshes(
    e,
    t,
    a,
    n,
    o,
    s
  );
}, Ut = (e, r, t, a = {}) => {
  const {
    predicate: n = (s) => s.isPickable,
    camera: o = e.activeCamera
  } = a;
  if (!o)
    throw new Error("Camera required");
  return e.multiPick(r, t, n, o);
}, Oe = (e, r = /.*/, t = 0) => {
  const a = "".padStart(t * 2);
  if (r.test(e.name)) {
    console.log(`${a}mesh: '${e.name}'`);
    const n = e.material;
    x(n) && Object.entries(n).filter(
      (s) => /.Texture$/.test(s[0])
    ).map((s) => {
      const [i, u] = s;
      u instanceof L && i !== "_environmentBRDFTexture" && console.log(`${a}tex: '${u.name}' (${i})`);
    });
  }
  e.getChildMeshes().map((n) => Oe(n, r, t + 1));
}, _e = {
  lookAt: Gt,
  getBox: Ie,
  describeMesh: Oe,
  getPlane: _t,
  getBoxInstance: Be,
  getSphere: Ct,
  getCylinder: It,
  getTorusKnot: Dt,
  getLine: Bt,
  walkMeshes: q,
  pickMesh: Tt,
  getMesh: v,
  getMeshAsync: j,
  calcTopOfMeshWorldPosition: St,
  mergeMeshes: Ne,
  getVoxModel: Ht,
  calcClientRectForMesh: Pt,
  updateArcRotateCameraPosition: Se,
  findClosestPick: At,
  destroyMesh: Rt,
  getMeshInstance: Nt,
  getMeshInstanceAsync: Ot,
  isInstancedMesh: Ft,
  pickMeshes: Ut,
  getPolyhedron: vt,
  updateMesh: R
}, Vt = (e = G()) => {
  const r = new H(e), t = e.getRenderingCanvas();
  Pe.getArcRotateCamera(r, "Camera", {}).attachControl(t, !0), Re.getHemisphericLight(r, "light1", {
    direction: [1, 1, 1]
  }), _e.getSphere(r, "sphere", {
    radius: 0.5
  });
  const n = { debug: !1 };
  return t.onkeyup = (o) => {
    o.ctrlKey && o.keyCode === 73 && (n.debug = !n.debug, n.debug ? r.debugLayer.hide() : (console.log("SHOW!"), r.debugLayer.show()));
  }, e.runRenderLoop(() => {
    r.render();
  }), r;
}, Kr = {
  createEngine: G,
  createCanvas: ve,
  v3: y,
  c3: S,
  c4: W,
  helloWorld: Vt,
  helloVrWorld: gt,
  attachEditorControls: Ee
}, $t = async ({
  canvas: e,
  ...r
}) => {
  const t = new be(e, {
    // powerPreference: "high-performance",
    ...r
  });
  return t.hideLoadingUI(), await t.initAsync(), t;
}, zt = () => be.IsSupportedAsync, Jr = {
  createWebGlEngine: G,
  createWebGpuEngine: $t,
  isWebGpuCapable: zt
}, Wt = (e) => (r) => {
};
async function Zt(e, r = e.name) {
  return await e();
}
const ce = (e) => {
  const r = Wt();
  return new Promise((t, a) => {
    try {
      e.onAfterRenderCameraObservable.addOnce(() => {
        r(), t();
      }), e.render(!0);
    } catch (n) {
      a(n);
    }
  });
}, Yt = (e) => {
  console.log("fixing eyelashes", e.meshes), e.meshes.forEach((r) => {
    if (r.name.includes("Eyelashes") && (console.log("fixing eyelashes", r.name), r.name.includes("primitive1"))) {
      console.log("fixing eyelashes: primitive1", r.name);
      const t = r.material;
      if (!t)
        throw new Error("Mesh has no material", { cause: r });
      const a = t.getActiveTextures()[0];
      a.hasAlpha = !0, a.getAlphaFromRGB = !0, t.transparencyMode = 1, t.opacityTexture = a, r.visibility = 0.5, t.albedoColor = new ye(0, 0, 0);
    }
  });
}, Xt = [
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
], Kt = [
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
], De = (e) => {
  const r = e?.material?.getActiveTextures() ?? [];
  if (x(
    r.find((t) => {
      const a = t?.name;
      return x(Xt.find((n) => a.includes(n)));
    })
  ) && (e.visibility = 0), x(
    r.find((t) => {
      const a = t?.name;
      return x(Kt.find((n) => a.includes(n)));
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
  e.getChildMeshes().map(De);
}, Jt = (e) => {
  console.log("fixing bump maps", e.meshes), e.meshes.forEach((r) => {
    const t = r.material;
    t && (t.bumpTexture = null);
  });
}, Qt = (e) => {
  Yt(e), e.meshes.map(De), Jt(e);
}, qt = (e) => {
  const { path: r, scene: t, name: a = r instanceof File ? r.name : r } = e;
  return t.getEngine().hideLoadingUI(), new Promise((o, s) => {
    try {
      de.ShowLoadingScreen = !1, de.Append(
        "",
        r,
        t,
        (i) => {
          const u = i.getMeshByName("__root__");
          if (!u)
            throw new Error("No root mesh found", { cause: i });
          u.name = a, i.cameras.length > 0 && (i.activeCamera = i.cameras[0]), i.animationGroups.forEach((c) => {
            c.stop();
          }), Qt(i), o(u);
        },
        (i) => {
        },
        (i, u, c) => {
          console.log({ path: r, scene: i, message: u, reason: c }), s(c);
        }
      );
    } catch (i) {
      s(i);
    }
  });
}, Qr = {
  renderOnce: ce,
  loadDazFigure: qt
  // fixDazFigure,
  // loadAssetContainer,
  // builder,
}, ke = (e, r = e.width, t = e.height) => {
  const a = document.createElement("canvas");
  return a.width = r, a.height = t, a.getContext("2d").drawImage(
    e,
    0,
    0,
    e.width,
    e.height,
    0,
    0,
    a.width,
    a.height
  ), a;
}, jt = async (e) => {
  if (typeof e == "string")
    return e;
  const r = document.createElement("canvas");
  return r.width = e.width, r.height = e.height, r.getContext("2d").drawImage(e, 0, 0), await ht.toSrcString(r);
}, He = async (e, r, t) => {
  if (t instanceof HTMLCanvasElement)
    return new Promise((n, o) => {
      try {
        const s = new ae(r, t, e);
        s.update(), s.hasAlpha = !0, n(s);
      } catch (s) {
        o(s);
      }
    });
  const a = await jt(t);
  return new Promise((n, o) => {
    try {
      const s = new L(a, e, !1, !0);
      s.name = r, s.hasAlpha = !0, s.onLoadObservable.addOnce(() => {
        n(s);
      });
    } catch (s) {
      o(s);
    }
  });
}, er = async (e, r) => {
  const t = Te.randomUuid(), { size: a, image: n, color: o } = e, s = P.CreatePlane(
    `plane-${t}`,
    {
      width: a,
      height: a
    },
    r
  ), i = new F(`material-${t}`, r);
  if (x(n)) {
    const u = await He(r, `layer-${t}`, n);
    e._texture = u, e._mesh = s, e._material = i, u.hasAlpha = !0, i.opacityTexture = u, i.emissiveTexture = u;
  }
  return x(o) && (i.emissiveColor = S(o)), s.material = i, s;
}, tr = async (e, r) => {
  const t = new H(r);
  return await Promise.all(
    e.map(async (a, n) => {
      const o = await er(a, t);
      return o.position.set(0, 0, -n), o;
    })
  ), t;
}, rr = ({ size: e } = { size: 4096 }) => {
  const r = G({ width: e, height: e }), t = r.getRenderingCanvas(), a = {
    layers: []
  }, n = {
    addLayer: (o) => (a.layers.push({ size: e, ...o }), n),
    render: async () => Zt(async () => {
      const o = await tr(a.layers, r), s = new ee("camera1", y(0, 0, -1e3), o);
      if (s.setTarget(y()), s.rotation = y(0, 0, Math.PI), s.mode = k.ORTHOGRAPHIC_CAMERA, s.minZ = 0, s.maxZ = 1e5, await ce(o), n.clear(), !t)
        throw new Error("No canvas found", { cause: r });
      return ke(t);
    }, "Texture render"),
    clear: () => (a.layers.forEach((o) => {
      o?._cached || (o?._texture?.dispose(), o?._mesh?.dispose(), o?._material?.dispose());
    }), a.layers.length = 0, n)
  };
  return n;
}, le = (e, r) => {
  const t = e.getSize(), a = e.getContext();
  r(a, t), e.update();
}, ar = (e) => {
  le(e, (r, t) => {
    const { width: a, height: n } = t;
    r.clearRect(0, 0, a, n);
  });
}, nr = (e, r = "DEBUG IMAGE") => {
  const t = Ue.copyToCanvas(e, 1024, 1024);
  t.style.border = "1px solid grey";
  const a = document.createElement("div");
  return a.textContent = r, document.body.appendChild(a), document.body.appendChild(t), new Promise((n, o) => {
    const s = () => {
      t.remove(), a.remove(), n(void 0);
    };
    t.onclick = s, a.onclick = s;
  });
}, or = (e, r) => {
  const t = e.getTextureByName(r);
  t && (t.dispose(), e.removeTexture(t));
}, sr = (e, r = {}) => {
  const { color: t = "black" } = r;
  le(e, (a, n) => {
    const { width: o, height: s } = n;
    a.fillStyle = E.from(t).toString(), a.fillRect(0, 0, o, s);
  });
}, ir = (e, r, t = {}) => {
  const {
    backgroundColor: a,
    outline: n = !0,
    color: o = "black",
    fontFamily: s = "monospace",
    fontStyle: i = "bold",
    outlineColor: u = E.builder({ color: "white" }).alpha(0.1).toString(),
    textureSize: c = Math.min(e.getSize().width, e.getSize().height)
  } = t;
  e.hasAlpha = !0;
  let p = c, g = `${i} ${p}px ${s}`;
  const d = e.getContext();
  d.font = g;
  let h = d.measureText(r);
  p = c / h.width * c, g = `${i} ${p}px ${s}`, d.font = g;
  const l = 0;
  h = d.measureText(r);
  const f = h.fontBoundingBoxAscent ?? 0, m = c - (c - f) / 2;
  d.lineWidth = p / 2;
  const b = {
    x: 0,
    y: m - p,
    width: c,
    height: f * 2
  };
  if (x(a)) {
    d.fillStyle = E.from(a).toString();
    const { x: C, y: I, width: X, height: ue } = b;
    d.fillRect(C, I, X, ue);
  }
  return n && (d.strokeStyle = u, d.strokeText(r, l, m)), d.fillStyle = o, d.fillText(r, l, m), e.hasAlpha = !0, e.update(), b;
}, Fe = {
  linearNearest: L.LINEAR_NEAREST,
  nearestNearest: L.NEAREST_NEAREST,
  linearLinear: L.LINEAR_LINEAR,
  nearestLinear: L.NEAREST_LINEAR
}, Z = (e, r, t) => {
  const a = e.getTextureByName(r);
  return x(a) ? a : t();
}, Y = (e, r) => {
  const { hasAlpha: t } = r;
  M(t, (a) => {
    e.hasAlpha = a;
  }), e instanceof ae && e.update();
}, cr = (e, r, t = {}) => {
  const a = Z(e, r, () => {
    const {
      generateMipMaps: n = !0,
      samplingMode: o = "linearNearest",
      width: s = 1024,
      height: i = 1024,
      init: u
    } = t, c = new ae(
      r,
      {
        width: s,
        height: i
      },
      e,
      n,
      Fe[o]
    );
    return u && (u(c.getContext()), c.update()), c;
  });
  return Y(a, t), a;
}, Ge = (e) => Fe[e], lr = (e, r, t) => Z(e, r, () => {
  const {
    element: a,
    generateMipMaps: n = !0,
    samplingMode: o = "linearNearest"
  } = t;
  if (!a)
    throw new Error("HTML element is required to create texture", {
      cause: t
    });
  const s = new je(r, a, {
    generateMipMaps: n,
    samplingMode: Ge(o),
    engine: e.getEngine(),
    scene: e
  });
  return Y(s, t), s;
}), ur = (e, r, t) => {
  const a = Z(e, r, () => {
    const {
      src: n,
      generateMipMaps: o = !0,
      samplingMode: s = "linearNearest"
    } = t;
    if (!n)
      throw new Error("src is required", { cause: t });
    const i = new L(n, e, {
      samplingMode: Ge(s)
    });
    return i.name = r, i;
  });
  return Y(a, t), a;
}, Ue = {
  builder: rr,
  copyToCanvas: ke,
  debugImage: nr,
  getTexture: Z,
  getHtmlElementTexture: lr,
  getDynamicTexture: cr,
  getPathTexture: ur,
  updateTexture: Y,
  imageToTexture: He,
  drawTextOnTexture: ir,
  drawOnTexture: le,
  drawBackgroundOnTexture: sr,
  clearTexture: ar,
  destroyTexture: or
}, dr = (e, r, t) => {
  const a = e?.effectLayers?.length ? e.getGlowLayerByName(r) : void 0;
  return x(a) ? a : new Ce(r, e, t);
}, hr = (e, r, t) => {
  const a = e.getHighlightLayerByName(r);
  return x(a) ? a : new et(r, e, t);
}, qr = {
  getGlowLayer: dr,
  getHighlightLayer: hr
}, Ve = {
  getMaterial: U,
  updateMaterial: Q,
  updateStandardMaterial: Ae
}, fr = (e, r) => {
  const t = e.getTransformNodeByName(r);
  return x(t) ? t : new tt(r, e);
}, jr = {
  getTransformNode: fr
}, gr = (e) => {
  const r = e.metadata ?? {}, t = r.solidParticleSystems ?? {};
  return x(t) || (e.metadata = {
    ...r,
    solidParticleSystems: {}
  }), t;
}, $e = (e, r, t) => {
  const a = gr(e), n = a[r];
  x(n);
  const o = t();
  return a[r] = o, o;
}, pr = (e, r, t) => $e(e, r, () => new re(r, e, {
  ...t
})), mr = (e, r, t = {}) => {
  const a = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), { material: u, onMeshBuild: c, ...p } = t;
  let g;
  const d = () => {
    g?.mesh?.dispose(!1), g = new re(r, e, {
      ...p
    });
  };
  d();
  const h = {
    scene: e,
    clearParticles: () => {
      g.particles.forEach((l, f) => {
        l.color = pe;
      }), g.setParticles(), g.particles.forEach((l, f) => {
        l.alive = !1;
      });
    },
    getSystem: () => g,
    getNames: () => s.keys(),
    hasMesh: (l) => s.has(l),
    getInstance: () => g,
    updateNextParticle: (l, f) => {
      const m = _.assertValue(
        s.get(l)
      ), b = _.assertValue(a.get(l)), C = m[b];
      h.updateParticleByIndex(C, f), a.set(l, b + 1);
    },
    updateParticleByIndex: (l, f) => {
      const m = g.particles[l];
      _.assertValue(m, `particle not found for ${l}`), m.alive = !0, f(m, l);
    },
    updateParticlesByName: (l, f) => {
      const m = s.get(l);
      m && m.forEach((b) => {
        h.updateParticleByIndex(b, f);
      });
    },
    removeMesh: (l) => {
      n.delete(l), o.delete(l), s.delete(l.name), i.delete(l.name), h.rebuild();
    },
    addMesh: (l, f = 1) => {
      if (n.has(l))
        throw new Error(
          `Mesh ${l.name} already exists in the Sps. Use removeMesh to remove it first.`
        );
      a.set(l.name, 0), n.set(l, f), i.set(l.name, l), h.rebuild(), h.clearParticles(), l.setEnabled(!1);
    },
    rebuild: () => {
      d(), o.clear();
      try {
        n.forEach((f, m) => {
          g.addShape(m, f);
          for (let b = 0; b < f; b++) {
            const C = g.particles.length - 1 - b;
            o.set(m, [
              ...o.get(m) || [],
              C
            ]), s.set(m.name, [
              ...o.get(m) || [],
              C
            ]);
          }
        });
        const l = g.buildMesh();
        u && (l.material = Ve.getMaterial(e, u)), c?.(l);
      } catch (l) {
        console.error(l);
      }
    },
    syncParticlestoMeshes: () => {
      o.forEach((l, f) => {
        for (let m = 0; m < l.length; m++) {
          const b = l[m], C = _.assertValue(g.particles[b]);
          if (C.position.copyFrom(f.position), C.rotation.copyFrom(f.rotation), C.scaling.copyFrom(f.scaling), f.material instanceof F) {
            const I = f.material.diffuseColor;
            C.color = new z(I.r, I.g, I.b, f.material.alpha);
          }
        }
      });
    },
    dispose: () => {
      n.clear(), o.clear(), s.clear(), i.clear(), a.clear(), g?.mesh?.dispose(), g.dispose();
    },
    update: () => {
      g.setParticles(), a.forEach((l, f) => {
        a.set(f, 0);
      }), g.particles.forEach((l) => {
        l.alive = !1, l.color = pe;
      });
    }
  };
  return h;
}, pe = new z(0, 0, 0, 0), yr = {
  getSolidParticleSystem: pr,
  getParticleSystem: $e,
  Sps: mr
}, wr = (e, r, t) => new rt(y(e), y(r), t), xr = (e, r, t = {}) => {
  const {
    trianglePredicate: a,
    fastCheck: n,
    predicate: o = (s) => s.isPickable
  } = t;
  return e.pickWithRay(r, o, n, a);
}, ea = {
  createRay: wr,
  pickWithRay: xr
}, Mr = (e) => new H(e), br = (e) => {
  e.debugLayer.isVisible() ? e.debugLayer.hide() : e.debugLayer.show();
}, ta = {
  createScene: Mr,
  toggleInspector: br,
  renderOnce: ce
}, Cr = (e) => {
  const r = e.getScene();
  e.dispose(), r.getLightsByTags("shadowCaster").forEach((a) => {
    a.metadata.shadowGenerator.removeShadowCaster(e);
  });
}, Tr = (e) => (e.getScene().getLightsByTags("shadowCaster").forEach((a) => {
  a.metadata.shadowGenerator.addShadowCaster(e);
}), () => {
  Cr(e);
}), ra = {
  addShadowToMesh: Tr
}, Sr = (e, r, t = {}) => {
  const a = new Ce(r, e, t);
  return a.neutralColor = new z(0, 0, 0, 0), a;
}, aa = {
  addGlowLayer: Sr,
  Constants: at
};
async function Er({
  baseUrl: e,
  imageNames: r,
  atlasSize: t,
  padding: a = 0
}) {
  const n = document.createElement("canvas");
  n.width = t, n.height = t;
  const o = n.getContext("2d"), s = {}, i = [];
  let u = 0, c = 0, p = 0;
  for (const d of r) {
    const h = d.endsWith(".png") ? d : `${d}.png`, l = await vr(`${e}/${h}`), f = l.width + a * 2, m = l.height + a * 2;
    if (u + f > t && (u = 0, c += p, p = 0), c + m > t)
      throw new Error(`Not enough space in atlas for image: ${h}`);
    o.drawImage(l, u + a, c + a), s[h] = {
      frame: {
        x: u + a,
        y: c + a,
        w: l.width,
        h: l.height
      }
    }, i.push({
      filename: h,
      frame: {
        x: u + a,
        y: c + a,
        w: l.width,
        h: l.height
      },
      rotated: !1,
      trimmed: !1,
      spriteSourceSize: { x: 0, y: 0, w: l.width, h: l.height },
      sourceSize: { w: l.width, h: l.height }
    }), u += f, p = Math.max(p, m);
  }
  const g = await new Promise(
    (d) => n.toBlob((h) => d(h), "image/png")
  );
  return {
    canvas: n,
    atlasBlob: g,
    spritePackageManagerJson: { frames: s },
    babylonSpriteMapJson: { frames: i }
  };
}
async function vr(e) {
  return new Promise((r, t) => {
    const a = new Image();
    a.src = e, a.onload = () => r(a), a.onerror = (n) => t(new Error(`Failed to load image: ${e}`));
  });
}
const Pr = (e, r, t = {}) => {
  const a = e?.spriteManagers?.find((d) => d.name === r);
  if (x(a))
    return a;
  const {
    capacity: n = 1,
    atlasUrl: o,
    atlasBlob: s,
    epsilon: i,
    samplingMode: u,
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
      n,
      e,
      c,
      i,
      u,
      p
    );
  } finally {
    g && URL.revokeObjectURL(g);
  }
}, ze = (e, r, t = {}) => {
  const a = e?.spriteManagers?.find((l) => l.name === r);
  if (x(a))
    return a;
  const {
    capacity: n = 1,
    cellSize: o = 64,
    atlasUrl: s,
    atlasBlob: i,
    epsilon: u,
    samplingMode: c,
    fromPacked: p,
    spriteJSON: g,
    options: d
  } = t;
  let h;
  try {
    i && (h = URL.createObjectURL(i));
    const l = x(s) ? s : h;
    if (N(l))
      throw new Error("altasUrl or atlasBlob is required", { cause: t });
    return new ot(
      r,
      l,
      n,
      o,
      e,
      u,
      c,
      p,
      g,
      d
    );
  } finally {
    h && URL.revokeObjectURL(h);
  }
}, Rr = (e, r, t) => {
  const a = dt(ze(e, t)), n = a?.sprites?.find((o) => o.name === r);
  return x(n) ? n : new st(r, a);
}, na = {
  getSpriteManager: ze,
  getSprite: Rr,
  createTextureAtlas: Er,
  getSpritePackedManager: Pr
}, Ar = (e, r = {}) => {
  const {
    random: t = Te.globalRandom,
    radius: a = 1,
    maxBounce: n = 0,
    groundZ: o = 0,
    speed: s = 20,
    decay: i = 0.01,
    dispose: u = () => e.isVisible = !1
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
    const { bounces: c = n } = e.props ?? {};
    if (c <= 0) {
      t() < i && u();
      return;
    }
    const p = c / n, g = e.position, [d, h, l] = D(g), f = (Xe) => (t() * a * 2 - a) * (p / 4) + Xe, [m, b] = [f(d), f(h)], C = y([m, b, o]), [I, X, ue] = D($.midPoint3(g, C)), We = y(I, X, l - t() * p * 3), Ze = {
      path: it.CreateCatmullRomSpline([g, We, C], s).getPoints().reverse(),
      bounces: c - 1
      // rotationAxis: [2 * random() - 1, 2 * random() - 1, 2 * random() - 1],
    }, Ye = e.props ?? {};
    e.props = { ...Ye, ...Ze };
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
    return r.match(/\([^()]*\)/g) ? r = r.replace(/\([^()]*\)/g, (a) => (a = a.slice(1, a.length - 1), B._HandleParenthesisContent(a, t))) : r = B._HandleParenthesisContent(r, t), r === "true" ? !0 : r === "false" ? !1 : B.Eval(r, t);
  }
  static _HandleParenthesisContent(r, t) {
    t = t || ((o) => o === "true");
    let a;
    const n = r.split("||");
    for (const o in n)
      if (Object.prototype.hasOwnProperty.call(n, o)) {
        let s = B._SimplifyNegation(n[o].trim());
        const i = s.split("&&");
        if (i.length > 1)
          for (let u = 0; u < i.length; ++u) {
            const c = B._SimplifyNegation(i[u].trim());
            if (c !== "true" && c !== "false" ? c[0] === "!" ? a = !t(c.substring(1)) : a = t(c) : a = c === "true", !a) {
              s = "false";
              break;
            }
          }
        if (a || s === "true") {
          a = !0;
          break;
        }
        s !== "true" && s !== "false" ? s[0] === "!" ? a = !t(s.substring(1)) : a = t(s) : a = s === "true";
      }
    return a ? "true" : "false";
  }
  static _SimplifyNegation(r) {
    return r = r.replace(/^[\s!]+/, (t) => (t = t.replace(/[\s]/g, () => ""), t.length % 2 ? "!" : "")), r = r.trim(), r === "!true" ? r = "false" : r === "!false" && (r = "true"), r;
  }
}
class T {
  /**
   * Adds support for tags on the given object
   * @param obj defines the object to use
   */
  static EnableFor(r) {
    r._tags = r._tags || {}, r.hasTags = () => T.HasTags(r), r.addTags = (t) => T.AddTagsTo(r, t), r.removeTags = (t) => T.RemoveTagsFrom(r, t), r.matchesTagsQuery = (t) => T.MatchesQuery(r, t);
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
    for (const a in t)
      if (Object.prototype.hasOwnProperty.call(t, a))
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
      const a = [];
      for (const n in r._tags)
        Object.prototype.hasOwnProperty.call(r._tags, n) && r._tags[n] === !0 && a.push(n);
      return a.join(" ");
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
    const a = t.split(" ");
    for (const n of a)
      T._AddTagTo(r, n);
  }
  /**
   * @internal
   */
  static _AddTagTo(r, t) {
    t = t.trim(), !(t === "" || t === "true" || t === "false") && (t.match(/[\s]/) || t.match(/^([!]|([|]|[&]){2})/) || (T.EnableFor(r), r._tags[t] = !0));
  }
  /**
   * Removes specific tags from a specific object
   * @param obj defines the object to use
   * @param tagsString defines the tags to remove
   */
  static RemoveTagsFrom(r, t) {
    if (!T.HasTags(r))
      return;
    const a = t.split(" ");
    for (const n in a)
      T._RemoveTagFrom(r, a[n]);
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
    return t === void 0 ? !0 : t === "" ? T.HasTags(r) : B.Eval(t, (a) => T.HasTags(r) && r._tags[a]);
  }
}
const Ir = (e, r, t) => {
  const { XYZI: a, RGBA: n } = r, o = n.map((i) => {
    const { r: u, g: c, b: p, a: g } = i;
    return E.builder({ color: [u, c, p, g], model: "rgba" }).toString();
  }), s = new A(t, e);
  return a.map((i, u) => {
    const c = o[i.i], p = Be(e, `voxel-${c}`, {
      color: c,
      material: `voxel-material-${c}`
    });
    return p.position = y(i), p.parent = s, p;
  }), T.AddTagsTo(s, "complex"), s;
}, Br = (e) => {
  const r = Object.entries(e).sort((t, a) => {
    const [n] = t, [o] = a;
    return n.localeCompare(o);
  });
  return JSON.stringify(r);
}, Lr = (e) => {
  const r = {};
  return e.forEach((t) => {
    const a = t?.material?.name;
    if (!a)
      throw new Error("Mesh material is missing name", { cause: t });
    const n = r[a] ?? [];
    n.push(t), r[a] = n;
  }), r;
}, Nr = (e, r, t) => {
  const { XYZI: a, RGBA: n } = r, o = n.map((d) => {
    const { r: h, g: l, b: f, a: m } = d;
    return E.builder({ color: [h, l, f, m], model: "rgba" }).toString();
  }), s = a.map((d, h) => {
    const l = o[d.i], [f, m, b] = D(d), C = Ie(
      e,
      `voxel-merged-${l}-${Br(d)}`,
      {
        position: [f, m, b],
        // color,
        // material: `voxel-merged-material-${color}`,
        material: "voxel-material",
        colors: ut.from(6).map(() => l)
      }
    );
    return C.setEnabled(!1), C;
  }), i = Lr(s), u = Object.values(i).map((d) => Ne(d)), c = new A(`merged-${t}`, e);
  u.filter(x).forEach((d) => d.parent = c);
  const p = U(e, "voxel-material", "standard");
  u.filter(x).forEach((d) => d.material = p), c.metadata = {
    voxels: s
  }, T.AddTagsTo(c, "merged");
  const g = new A(t, e);
  return g.metadata = {
    voxels: s
  }, c.parent = g, g;
}, oa = {
  animateExplosion: Ar,
  voxDataToSps: Le,
  voxDataToMergedModel: Nr,
  voxDataToComplexModel: Ir
}, Or = ({
  engine: e,
  canvas: r
}) => {
  const t = new w.Scene(e);
  console.log(t), new w.ArcRotateCamera(
    "ArcRotateCamera",
    -Math.PI / 2,
    Math.PI / 2.2,
    50,
    new w.Vector3(0, 0, 0),
    t
  ).attachControl(r, !0), new w.HemisphericLight(
    "light",
    new w.Vector3(0, 1, -1),
    t
  );
  const n = new w.StandardMaterial("mat");
  n.diffuseTexture = new w.Texture("textures/earth.jpg");
  const o = new w.StandardMaterial("mat"), s = new w.Texture("textures/fire.jpg");
  o.diffuseTexture = s;
  const i = new w.SolidParticleSystem("SPS", t, {
    useModelMaterial: !0
  }), u = w.MeshBuilder.CreateBox("FOO");
  return u.material = n, i.addShape(u, 1e4), i.buildMesh(), i.initParticles = () => {
    for (let p = 0; p < i.nbParticles; p++) {
      const g = i.particles[p];
      g.position.x = w.Scalar.RandomRange(-20, 20), g.position.y = w.Scalar.RandomRange(-20, 20), g.position.z = w.Scalar.RandomRange(-20, 20);
    }
  }, i.initParticles(), i.setParticles(), { scene: t, update: () => {
    const p = Math.sin(Date.now() * 5e-3);
    i.particles.forEach((g, d) => {
      d > 20 ? (g.rotation.x = p, n.alpha = p, n.diffuseTexture = s) : g.rotation.y = p;
    }), i.setParticles();
  } };
}, _r = ({
  engine: e,
  canvas: r
}) => {
  const t = new w.Scene(e);
  console.log(t), Pe.getArcRotateCamera(t, "ArcRotateCamera", {
    alpha: -Math.PI / 2,
    beta: Math.PI / 2.2,
    radius: 50,
    target: [0, 0, 0]
  }).attachControl(r, !0), Re.getHemisphericLight(t, "light", {
    direction: [0, 1, -1]
  });
  const n = Ue.getPathTexture(t, "tex", {
    src: "/images/test.jpg"
  }), o = Ve.getMaterial(t, "mat", {
    opacityTexture: n.name
    // diffuseColor: Colors.from("red").alpha(0.99).toString(),
    // alpha: 0.99,
  }), s = _e.getBox(
    t,
    "box1"
    //  { material: mat.name }
  ), i = yr.Sps(t, "sps", {
    material: o.name,
    updatable: !0,
    // enableDepthSort: true,
    onMeshBuild: (c) => {
      c.useVertexColors = !0, c.hasVertexAlpha = !0;
    }
  });
  return i.addMesh(s, 1e4), i.updateParticlesByName("box1", (c, p) => {
    c.position.x = w.Scalar.RandomRange(-20, 20), c.position.y = w.Scalar.RandomRange(-20, 20), c.position.z = w.Scalar.RandomRange(-20, 20);
  }), { scene: t, update: () => {
    const c = Math.sin(Date.now() * 5e-3), p = ft.noiseStream(0);
    i.updateParticlesByName("box1", (g, d) => {
      g.color = new w.Color4(p(), p(), p(), 0.5), Math.random() > 0.5 ? g.rotation.x = p() * c : g.rotation.y = p() * c;
    }), i.update();
  } };
}, sa = {
  spsDebug: Or,
  spsDebug2: _r
};
export {
  Kr as Babs,
  ge as CAMERA_MODES,
  Pe as Cameras,
  sa as Debugs,
  Jr as Engines,
  qr as Layers,
  Re as Lights,
  Ve as Materials,
  _e as Meshes,
  Qr as Models,
  jr as Nodes,
  yr as Particles,
  ea as Rays,
  ta as Scenes,
  ra as Shadows,
  aa as Specials,
  na as Sprites,
  Ue as Textures,
  oa as Voxels,
  Sr as addGlowLayer
};
//# sourceMappingURL=index.js.map
