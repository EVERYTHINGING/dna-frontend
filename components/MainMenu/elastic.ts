import Snap from "./snapsvgImporter";
import menuFactory from "./menuFactory";
import { pxToNum } from "./utils";
import {Path} from "./types";
import {MenuFactoryStyles} from "./types/menuFactory";

const MORPH_SHAPE_WIDTH = 120;

const styles:MenuFactoryStyles = {
  svg: {
    lib: Snap,
    pathInitial: "M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z",
    pathOpen: "M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z",
    animate(path:Path) {
      path.animate({ path: this.pathOpen }, 400, window.mina.easeinout);
    }
  },

  morphShape(isOpen:boolean, width:string, right:boolean) {
    return {
      position: "absolute",
      width: MORPH_SHAPE_WIDTH,
      height: "100%",
      right: right ? "inherit" : 0,
      left: right ? 0 : "inherit",
      MozTransform: right ? "rotateY(180deg)" : "",
      MsTransform: right ? "rotateY(180deg)" : "",
      OTransform: right ? "rotateY(180deg)" : "",
      WebkitTransform: right ? "rotateY(180deg)" : "",
      transform: right ? "rotateY(180deg)" : ""
    };
  },

  menuWrap(isOpen:boolean, width:string, right:boolean) {
    return {
      MozTransform: isOpen
        ? "translate3d(0, 0, 0)"
        : right
        ? "translate3d(100%, 0, 0)"
        : "translate3d(-100%, 0, 0)",
      MsTransform: isOpen
        ? "translate3d(0, 0, 0)"
        : right
        ? "translate3d(100%, 0, 0)"
        : "translate3d(-100%, 0, 0)",
      OTransform: isOpen
        ? "translate3d(0, 0, 0)"
        : right
        ? "translate3d(100%, 0, 0)"
        : "translate3d(-100%, 0, 0)",
      WebkitTransform: isOpen
        ? "translate3d(0, 0, 0)"
        : right
        ? "translate3d(100%, 0, 0)"
        : "translate3d(-100%, 0, 0)",
      transform: isOpen
        ? "translate3d(0, 0, 0)"
        : right
        ? "translate3d(100%, 0, 0)"
        : "translate3d(-100%, 0, 0)",
      transition: "all 0.3s"
    };
  },

  menu(isOpen:boolean, width:string, right:boolean) {
    return {
      position: "fixed",
      right: right ? 0 : "inherit",
      width: pxToNum(width) - MORPH_SHAPE_WIDTH,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      overflow: "visible"
    };
  },

  itemList(isOpen:boolean, width:string, right:boolean) {
    if (right) {
      return {
        position: "relative",
        left: "-110px",
        width: "170%",
        overflow: "auto"
      };
    }
  },

  pageWrap(isOpen:boolean, width:string, right:boolean) {
    return {
      MozTransform: isOpen ? "" : right ? "translate3d(-100px, 0, 0)" : "translate3d(100px, 0, 0)",
      MsTransform: isOpen ? "" : right ? "translate3d(-100px, 0, 0)" : "translate3d(100px, 0, 0)",
      OTransform: isOpen ? "" : right ? "translate3d(-100px, 0, 0)" : "translate3d(100px, 0, 0)",
      WebkitTransform: isOpen
        ? ""
        : right
        ? "translate3d(-100px, 0, 0)"
        : "translate3d(100px, 0, 0)",
      transform: isOpen ? "" : right ? "translate3d(-100px, 0, 0)" : "translate3d(100px, 0, 0)",
      transition: isOpen ? "all 0.3s" : "all 0.3s 0.1s"
    };
  },

  outerContainer(isOpen:boolean) {
    return {
      overflow: isOpen ? "" : "hidden"
    };
  }
};

export default menuFactory(styles);
