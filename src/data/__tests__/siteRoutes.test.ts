import { describe, expect, it } from "vitest";
import { guides } from "@/data/guides";
import { publicRoutes, routePaths, sectionPaths } from "@/data/siteRoutes";


describe("siteRoutes", () => {
  it("has unique public routes", () => {
    const routePaths = publicRoutes.map((route) => route.path);
    const uniqueRoutePaths = new Set(routePaths);

    expect(uniqueRoutePaths.size).toBe(routePaths.length);
  });

  it("uses slash-prefixed route paths", () => {
    publicRoutes.forEach((route) => {
      expect(route.path.startsWith("/")).toBe(true);
    });
  });

  it("does not use trailing slashes except for the homepage", () => {
    publicRoutes.forEach((route) => {
      if (route.path === "/") {
        return;
      }

      expect(route.path.endsWith("/")).toBe(false);
    });
  });

  it("includes all guide pages in the public sitemap route list", () => {
    const publicRouteSet = new Set(publicRoutes.map((route) => route.path));

    guides.forEach((guide) => {
      expect(publicRouteSet.has(guide.href)).toBe(true);
    });
  });

  it("includes key utility pages in the public route list", () => {
    const publicRouteSet = new Set(publicRoutes.map((route) => route.path));

    expect(publicRouteSet.has(routePaths.home)).toBe(true);
    expect(publicRouteSet.has(routePaths.methodology)).toBe(true);
    expect(publicRouteSet.has(routePaths.guides)).toBe(true);
    expect(publicRouteSet.has(routePaths.feedback)).toBe(true);
    expect(publicRouteSet.has(routePaths.privacy)).toBe(true);
    expect(publicRouteSet.has(routePaths.disclaimer)).toBe(true);
    expect(publicRouteSet.has(routePaths.terms)).toBe(true);
  });

  it("has section paths that start from the homepage", () => {
    expect(sectionPaths.calculator).toBe("/#calculator");
    expect(sectionPaths.calculatorInputs).toBe("/#calculator-inputs");
    expect(sectionPaths.calculatorResult).toBe("/#calculator-result");
    expect(sectionPaths.howItWorks).toBe("/#how-it-works");
  });

  it("has section paths with hash fragments", () => {
    Object.values(sectionPaths).forEach((path) => {
      expect(path).toContain("#");
    });
  });
});
