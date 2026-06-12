"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { MotionValue } from "motion/react";

// Coordinates (lng, lat)
const WORLD: [number, number] = [33, 26];
const VAN: [number, number] = [43.38, 38.5];
const LAKE_VAN: [number, number] = [42.95, 38.63];
const AKHTAMAR: [number, number] = [43.0353, 38.3406];

interface GlobeProps {
  mode: "intro" | "map";
  /** intro scroll progress 0..1 (drives the zoom into Van) */
  progress?: MotionValue<number>;
  markerLabel?: string;
  onReady?: () => void;
  className?: string;
}

const clamp = (t: number) => Math.max(0, Math.min(1, t));
const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp(t);

/**
 * Mapbox GL globe. This module is the dynamic-import chunk — mapbox-gl + its CSS
 * never enter the base bundle. The parent (GlobeStage) only mounts it when a
 * token + WebGL exist and motion is allowed; everything is also wrapped in
 * try/catch so a runtime failure degrades to the GlobeStage poster.
 */
export default function Globe({
  mode,
  progress,
  markerLabel,
  onReady,
  className,
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const el = containerRef.current;
    if (!token || !el) return;
    mapboxgl.accessToken = token;

    let map: mapboxgl.Map;
    try {
      map = new mapboxgl.Map({
        container: el,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: mode === "intro" ? WORLD : LAKE_VAN,
        zoom: mode === "intro" ? 1.4 : 8.5,
        pitch: 0,
        projection: "globe",
        interactive: mode === "map",
        attributionControl: true,
        antialias: true,
      });
    } catch {
      return;
    }
    mapRef.current = map;

    map.on("style.load", () => {
      try {
        map.setFog({
          color: "rgb(28, 22, 16)",
          "high-color": "rgb(46, 34, 22)",
          "horizon-blend": 0.08,
          "space-color": "rgb(10, 8, 6)",
          "star-intensity": 0.45,
        });
      } catch {
        /* fog unsupported — ignore */
      }
    });

    map.on("load", () => {
      onReadyRef.current?.();
      if (mode === "map") {
        map.flyTo({
          center: AKHTAMAR,
          zoom: 13.2,
          pitch: 55,
          bearing: -18,
          duration: 4200,
          essential: true,
        });
        new mapboxgl.Marker({ color: "#b0540d" })
          .setLngLat(AKHTAMAR)
          .setPopup(
            markerLabel
              ? new mapboxgl.Popup({ offset: 22, closeButton: false }).setText(
                  markerLabel,
                )
              : undefined,
          )
          .addTo(map);
        try {
          map.addSource("akdamar-route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: { type: "LineString", coordinates: [VAN, AKHTAMAR] },
            },
          });
          map.addLayer({
            id: "akdamar-route",
            type: "line",
            source: "akdamar-route",
            layout: { "line-cap": "round", "line-join": "round" },
            paint: {
              "line-color": "#e2761e",
              "line-width": 2.5,
              "line-dasharray": [1, 1.6],
            },
          });
        } catch {
          /* layer add failed — marker still shows */
        }
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mode, markerLabel]);

  // Intro: scrub the camera from earth-in-space down to Van as the user scrolls.
  useEffect(() => {
    if (mode !== "intro" || !progress) return;
    const apply = (p: number) => {
      const map = mapRef.current;
      if (!map) return;
      const k = clamp(p / 0.7);
      try {
        map.jumpTo({
          center: [lerp(WORLD[0], VAN[0], k), lerp(WORLD[1], VAN[1], k)],
          zoom: lerp(1.4, 12.5, k),
          pitch: lerp(0, 55, k),
        });
      } catch {
        /* ignore transient errors during teardown */
      }
    };
    apply(progress.get());
    const unsub = progress.on("change", apply);
    return () => unsub();
  }, [mode, progress]);

  return <div ref={containerRef} className={className} aria-hidden />;
}
