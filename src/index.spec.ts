import { ReturnToTop, ReturnToTopPlacement, ReturnToTopShape } from "./index";

describe("ReturnToTop", () => {
    let returnToTop: ReturnToTop;

    beforeEach(() => {
        document.body.innerHTML = "";
        returnToTop = new ReturnToTop();
    });

    test("should create return to top button with default settings", () => {
        expect(returnToTop.settings.arrowColour).toBe("#FFFFFF");
        expect(returnToTop.settings.placement).toBe(ReturnToTopPlacement.right);
        expect(returnToTop.settings.color).toBe("#000000");
        expect(returnToTop.settings.shape).toBe(ReturnToTopShape.square);
        expect(returnToTop.settings.animation).toBe(true);
    });

    test("should apply custom settings", () => {
        const customSettings = {
            arrowColour: "#FF0000",
            placement: ReturnToTopPlacement.left,
            color: "#00FF00",
            shape: ReturnToTopShape.circle,
            animation: { rotate: false, fade: true },
        };
        returnToTop = new ReturnToTop(customSettings);

        expect(returnToTop.settings.arrowColour).toBe("#FF0000");
        expect(returnToTop.settings.placement).toBe(ReturnToTopPlacement.left);
        expect(returnToTop.settings.color).toBe("#00FF00");
        expect(returnToTop.settings.shape).toBe(ReturnToTopShape.circle);
        expect(returnToTop.settings.animation).toEqual({
            rotate: false,
            fade: true,
        });
    });

    test("should create return to top button element", () => {
        const button = returnToTop.createElement();
        expect(button.classList.contains("return-to-top")).toBe(true);
        expect(button.querySelector(".return-to-top--inner")).not.toBeNull();
        expect(button.querySelector(".return-to-top--icon")).not.toBeNull();
    });

    test("should create style element with correct styles", () => {
        const styleElement = returnToTop.createStyleElement();
        expect(styleElement.tagName).toBe("STYLE");
        expect(styleElement.innerHTML).toContain(".return-to-top");
    });

    test("should set opacity based on scroll position", () => {
        global.scrollY = 500;
        global.innerHeight = 1000;
        returnToTop.setOpacity();
        expect(returnToTop.returnTopContainerEl.style.opacity).toBe("0.5");
    });

    test("should set rotation based on scroll position", () => {
        global.scrollY = 500;
        global.innerHeight = 1000;
        returnToTop.setRotation();
        expect(returnToTop.returnTopEl.style.transform).toBe("rotate(45deg)");
    });

    test("should handle scroll event", () => {
        const setOpacitySpy = jest.spyOn(returnToTop, "setOpacity");
        const setRotationSpy = jest.spyOn(returnToTop, "setRotation");
        global.dispatchEvent(new Event("scroll"));
        expect(setOpacitySpy).toHaveBeenCalled();
        expect(setRotationSpy).toHaveBeenCalled();
    });
});
