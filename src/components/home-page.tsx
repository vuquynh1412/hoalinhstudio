"use client";

import { Instrument_Serif, Montserrat } from "next/font/google";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  CirclePlay,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { FeaturedProjectsSection } from "@/components/featured-projects-section";
import { focusServices, insightCards } from "@/content/landing-content";
import type { Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type HomePageProps = {
  locale: Locale;
};

const aboutRevealText =
  "Hoa Linh Studio làm việc với khách hàng dựa trên sự rõ ràng và tôn trọng cam kết. Mỗi dự án đều được trao đổi minh bạch ngay từ đầu, phản hồi kịp thời trong quá trình thực hiện và luôn đảm bảo chất lượng ở từng giai đoạn.";

const introVectorPath =
  "M524.346 276.062C535.442 296.758 541.358 319.926 541.501 343.45C529.621 363.766 512.87 380.85 492.935 393.206C492.222 369.54 485.807 346.253 474.259 325.462C494.693 313.201 511.919 296.236 524.37 276.062H524.346ZM402.051 487.871C425.55 487.135 448.598 480.648 469.008 468.981C480.651 448.546 487.137 425.522 487.874 402.045C467.036 413.308 443.632 419.391 419.777 419.795C419.373 443.604 413.29 467.009 402.051 487.871ZM276.074 524.345C296.769 535.442 319.935 541.358 343.458 541.501C363.773 529.62 380.857 512.892 393.212 492.933C369.571 492.22 346.286 485.804 325.472 474.256C313.211 494.691 296.246 511.918 276.074 524.369V524.345ZM216.53 474.232C195.716 485.78 172.431 492.22 148.789 492.909C161.169 512.868 178.252 529.597 198.544 541.477C222.066 541.335 245.257 535.442 265.952 524.321C245.756 511.87 228.791 494.667 216.53 474.209V474.232ZM54.1281 402.045C54.8647 425.522 61.3513 448.57 72.9939 468.981C93.404 480.648 116.452 487.135 139.951 487.871C128.712 467.009 122.629 443.628 122.225 419.795C98.37 419.391 74.9898 413.308 54.1281 402.045ZM17.656 276.062C6.53611 296.758 0.643539 319.926 0.500977 343.402C12.3574 363.718 29.1085 380.826 49.0672 393.206C49.78 369.54 56.1953 346.253 67.7428 325.462C47.3089 313.201 30.0826 296.236 17.6322 276.086L17.656 276.062ZM67.7428 216.54C56.1953 195.749 49.7562 172.462 49.0672 148.796C29.0847 161.176 12.3574 178.284 0.500977 198.576C0.643539 222.052 6.53611 245.244 17.656 265.964C30.0826 245.79 47.3089 228.824 67.7666 216.564L67.7428 216.54ZM139.951 54.1067C116.452 54.8433 93.404 61.3302 72.9939 72.9971C61.3275 93.4081 54.841 116.457 54.1044 139.957C74.9422 128.694 98.3462 122.611 122.202 122.207C122.606 98.3505 128.688 74.9693 139.951 54.1067ZM265.952 17.6567C245.28 6.53638 222.09 0.643545 198.567 0.500977C178.276 12.3579 161.192 29.086 148.813 49.0456C172.479 49.7584 195.74 56.174 216.53 67.722C228.791 47.2635 245.779 30.0364 265.952 17.633V17.6567ZM325.448 67.722C346.238 56.174 369.523 49.7346 393.165 49.0456C380.81 29.086 363.726 12.3579 343.434 0.500977C319.935 0.643545 296.745 6.53638 276.05 17.6567C296.199 30.0839 313.164 47.2872 325.424 67.7458L325.448 67.722ZM487.874 139.933C487.137 116.433 480.651 93.3844 468.984 72.9733C448.574 61.3065 425.527 54.8196 402.028 54.083C413.29 74.9217 419.373 98.3267 419.777 122.183C443.632 122.587 467.012 128.67 487.874 139.933ZM524.346 265.94C535.442 245.244 541.358 222.029 541.501 198.505C529.621 178.213 512.87 161.128 492.935 148.772C492.222 172.439 485.807 195.725 474.259 216.516C494.717 228.777 511.919 245.743 524.37 265.916L524.346 265.94ZM401.956 346.634C413.242 367.496 419.349 390.925 419.753 414.758C443.703 414.354 467.179 407.986 487.898 396.247C487.684 372.415 481.459 348.915 469.84 328.005C448.978 339.576 425.645 345.992 401.933 346.657L401.956 346.634ZM346.642 401.974C345.953 425.664 339.538 448.998 327.99 469.837C348.923 481.456 372.446 487.681 396.254 487.895C407.968 467.151 414.335 443.699 414.739 419.771C390.908 419.367 367.504 413.237 346.642 401.974ZM323.618 467.294C335.166 446.384 341.367 422.908 341.605 399.146C322.026 387.575 305.347 371.631 292.849 352.645C291.518 375.314 285.031 397.459 273.888 417.229C285.958 437.711 303.066 454.938 323.595 467.294H323.618ZM200.373 399.146C200.611 422.932 206.812 446.384 218.36 467.294C238.889 454.938 255.996 437.711 268.067 417.229C256.923 397.436 250.436 375.29 249.106 352.645C236.632 371.631 219.928 387.575 200.35 399.146H200.373ZM195.36 401.974C174.498 413.261 151.118 419.367 127.263 419.771C127.667 443.699 134.034 467.151 145.748 487.895C169.556 487.681 193.055 481.456 214.012 469.837C202.464 448.998 196.049 425.664 195.36 401.974ZM140.022 346.634C116.309 345.968 92.9764 339.553 72.1147 327.981C60.4959 348.915 54.2707 372.415 54.0569 396.247C74.7759 407.962 98.2512 414.33 122.202 414.758C122.606 390.925 128.736 367.52 139.998 346.634H140.022ZM140.022 195.368C128.736 174.506 122.629 151.101 122.225 127.244C98.2749 127.648 74.7997 134.016 54.0806 145.755C54.2945 169.587 60.5197 193.087 72.1385 214.021C93.0001 202.449 116.309 196.034 140.022 195.368ZM195.36 140.004C196.025 116.29 202.44 92.9567 214.012 72.1179C193.103 60.4986 169.58 54.2731 145.772 54.0592C134.058 74.7792 127.667 98.2555 127.263 122.207C151.094 122.611 174.498 128.741 195.36 140.004ZM249.106 189.333C250.413 166.712 256.899 144.566 268.067 124.726C255.996 104.243 238.865 87.0163 218.36 74.6604C206.789 95.5704 200.587 119.047 200.373 142.832C219.976 154.404 236.655 170.348 249.13 189.309L249.106 189.333ZM341.629 142.856C341.415 119.07 335.213 95.5942 323.642 74.6841C303.113 87.0401 285.982 104.267 273.935 124.749C285.103 144.59 291.589 166.736 292.896 189.357C305.347 170.395 322.05 154.451 341.652 142.879L341.629 142.856ZM346.642 140.004C367.48 128.718 390.884 122.611 414.739 122.207C414.335 98.2555 407.944 74.7792 396.23 54.0592C372.422 54.2731 348.923 60.4986 327.99 72.1179C339.562 92.9804 345.977 116.314 346.642 140.004ZM401.956 195.368C425.669 196.034 449.002 202.449 469.84 214.021C481.459 193.087 487.684 169.587 487.898 145.755C467.179 134.04 443.703 127.672 419.753 127.244C419.349 151.101 413.219 174.506 401.956 195.368ZM414.716 414.734C414.288 390.83 407.92 367.401 396.206 346.657C373.468 346.396 351.062 340.931 330.77 330.761C340.963 351.053 346.428 373.484 346.666 396.224C367.361 407.938 390.813 414.306 414.716 414.734ZM195.312 396.224C195.574 373.484 201.039 351.053 211.232 330.761C190.94 340.955 168.511 346.42 145.796 346.681C134.082 367.401 127.714 390.854 127.286 414.758C151.189 414.33 174.641 407.962 195.336 396.247L195.312 396.224ZM195.312 145.755C174.617 134.04 151.166 127.672 127.263 127.244C127.69 151.172 134.058 174.601 145.772 195.321C168.534 195.582 190.964 201.024 211.208 211.217C201.015 190.925 195.55 168.494 195.312 145.755ZM346.666 145.755C346.405 168.494 340.963 190.925 330.77 211.217C351.014 201.024 373.444 195.558 396.206 195.321C407.92 174.625 414.288 151.172 414.716 127.244C390.813 127.672 367.361 134.04 346.666 145.755ZM124.72 268.055C144.513 256.91 166.681 250.424 189.325 249.093C170.34 236.618 154.421 219.938 142.849 200.358C119.065 200.572 95.59 206.774 74.6809 218.369C86.9887 238.852 104.191 255.96 124.72 268.055ZM189.325 292.861C166.705 291.555 144.536 285.068 124.72 273.9C104.215 285.994 86.9887 303.126 74.6809 323.609C95.59 335.181 119.065 341.382 142.849 341.62C154.397 322.064 170.34 305.36 189.325 292.861ZM417.258 273.9C397.418 285.068 375.273 291.555 352.654 292.861C371.614 305.336 387.558 322.041 399.129 341.62C422.913 341.406 446.388 335.204 467.297 323.609C454.989 303.103 437.763 285.994 417.258 273.9ZM352.654 249.093C375.321 250.424 397.466 256.91 417.258 268.055C437.787 255.96 454.989 238.852 467.297 218.369C446.388 206.798 422.913 200.596 399.129 200.358C387.558 219.938 371.638 236.642 352.654 249.093ZM20.531 271.001C32.625 291.483 49.78 308.71 70.2852 321.043C82.5456 300.608 99.5342 283.404 119.731 270.977C99.5342 258.55 82.5456 241.347 70.2852 220.936C49.7562 233.268 32.625 250.495 20.531 271.001ZM288.073 344.851C281.396 333.208 276.383 320.662 273.08 307.665C274.791 307.57 276.478 307.38 278.141 307.071C280.469 316.053 283.63 324.821 287.645 333.185C286.932 323.918 285.293 314.746 282.822 305.788C284.437 305.241 286.006 304.576 287.503 303.816C291.138 316.694 293.062 330.024 293.11 343.45C304.966 363.718 321.646 380.755 341.557 393.111C340.797 369.73 334.311 346.752 322.715 326.389C311.097 319.641 300.523 311.3 291.185 301.701C292.611 300.75 293.965 299.705 295.248 298.588C301.711 305.17 308.792 311.134 316.419 316.362C311.192 308.734 305.228 301.677 298.646 295.214C299.763 293.931 300.808 292.6 301.759 291.174C311.358 300.513 319.674 311.087 326.446 322.706C346.808 334.301 369.761 340.788 393.141 341.549C380.81 321.66 363.773 304.956 343.506 293.123C330.057 293.075 316.728 291.151 303.85 287.515C304.61 285.994 305.275 284.45 305.822 282.81C314.756 285.282 323.927 286.921 333.194 287.634C324.83 283.618 316.086 280.458 307.081 278.129C307.414 276.49 307.58 274.803 307.675 273.068C320.672 276.371 333.194 281.361 344.86 288.062C368.288 287.943 391.454 282.05 412.126 270.977C391.478 259.928 368.335 254.035 344.86 253.893C333.194 260.593 320.672 265.583 307.675 268.886C307.58 267.175 307.39 265.488 307.081 263.825C316.063 261.496 324.83 258.336 333.218 254.297C323.951 255.01 314.756 256.649 305.822 259.12C305.275 257.504 304.61 255.936 303.85 254.439C316.728 250.804 330.057 248.879 343.506 248.808C363.75 236.975 380.786 220.294 393.141 200.406C369.713 201.166 346.785 207.653 326.446 219.272C319.674 230.868 311.358 241.466 301.759 250.78C300.808 249.354 299.763 248 298.646 246.741C305.228 240.277 311.215 233.197 316.443 225.569C308.816 230.797 301.735 236.761 295.248 243.343C293.965 242.226 292.611 241.18 291.185 240.23C300.523 230.63 311.12 222.29 322.739 215.566C334.334 195.202 340.821 172.225 341.581 148.844C321.67 161.199 304.966 178.26 293.134 198.505C293.086 211.93 291.138 225.26 287.503 238.139C286.006 237.379 284.437 236.713 282.822 236.167C285.317 227.232 286.932 218.061 287.645 208.794C283.63 217.158 280.469 225.926 278.141 234.907C276.502 234.575 274.815 234.408 273.08 234.313C276.383 221.316 281.372 208.794 288.073 197.127C287.954 173.698 282.061 150.531 270.989 129.858C259.917 150.554 254.024 173.698 253.905 197.127C260.582 208.794 265.595 221.316 268.898 234.313C267.187 234.408 265.5 234.598 263.837 234.907C261.509 225.926 258.349 217.181 254.333 208.794C255.046 218.061 256.685 227.232 259.156 236.167C257.541 236.713 255.973 237.379 254.476 238.139C250.84 225.26 248.916 211.93 248.844 198.481C237.012 178.236 220.332 161.199 200.397 148.82C201.157 172.201 207.644 195.178 219.239 215.542C230.858 222.29 241.455 230.63 250.793 240.23C249.367 241.18 248.013 242.226 246.73 243.343C240.243 236.737 233.163 230.773 225.535 225.545C230.763 233.173 236.75 240.254 243.332 246.741C242.215 248.024 241.17 249.354 240.219 250.804C230.62 241.466 222.28 230.892 215.532 219.272C195.193 207.677 172.241 201.19 148.837 200.43C161.169 220.318 178.205 236.998 198.472 248.832C211.921 248.879 225.274 250.828 238.152 254.463C237.392 255.96 236.727 257.528 236.18 259.144C227.222 256.649 218.051 255.01 208.784 254.297C217.172 258.312 225.916 261.473 234.897 263.801C234.564 265.441 234.398 267.128 234.303 268.862C221.306 265.56 208.784 260.57 197.094 253.869C173.619 254.012 150.476 259.904 129.829 270.953C150.524 282.026 173.667 287.919 197.094 288.038C208.784 281.361 221.306 276.347 234.303 273.044C234.398 274.755 234.588 276.442 234.897 278.106C225.916 280.434 217.148 283.595 208.761 287.634C218.051 286.921 227.222 285.282 236.18 282.81C236.727 284.426 237.392 285.994 238.152 287.491C225.274 291.127 211.921 293.052 198.472 293.099C178.205 304.956 161.192 321.66 148.861 341.525C172.241 340.765 195.194 334.278 215.556 322.658C222.328 311.063 230.668 300.465 240.243 291.127C241.194 292.553 242.239 293.907 243.356 295.19C236.774 301.653 230.787 308.734 225.559 316.362C233.186 311.134 240.267 305.17 246.73 298.588C248.013 299.705 249.343 300.75 250.769 301.701C241.431 311.3 230.834 319.641 219.239 326.389C207.644 346.752 201.157 369.73 200.397 393.111C220.284 380.755 236.988 363.718 248.844 343.45C248.892 330.001 250.84 316.67 254.476 303.792C255.973 304.552 257.541 305.217 259.156 305.764C256.685 314.722 255.046 323.894 254.333 333.161C258.349 324.797 261.532 316.029 263.837 307.047C265.477 307.38 267.164 307.546 268.898 307.641C265.595 320.639 260.606 333.161 253.905 344.828C254.048 368.304 259.941 391.448 270.989 412.073C282.038 391.448 287.93 368.304 288.073 344.828V344.851ZM521.447 271.001C509.353 250.495 492.222 233.268 471.693 220.936C459.433 241.347 442.444 258.55 422.248 270.977C442.444 283.404 459.433 300.608 471.693 321.043C492.198 308.71 509.353 291.507 521.447 271.001ZM220.926 70.2883C241.384 82.5729 258.586 99.5861 270.989 119.76C283.392 99.5861 300.595 82.5967 321.052 70.2883C308.721 49.7584 291.494 32.6264 271.013 20.5556C250.508 32.6027 233.281 49.7584 220.926 70.2883ZM321.052 471.69C300.595 459.382 283.392 442.392 270.989 422.219C258.586 442.392 241.384 459.382 220.926 471.69C233.234 492.196 250.484 509.352 271.013 521.446C291.494 509.352 308.721 492.196 321.052 471.69Z";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: ["italic"],
  weight: "400",
});

export function HomePage({ locale }: HomePageProps) {
  const [introState, setIntroState] = useState<
    "visible" | "closing" | "hidden"
  >("visible");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isServiceAutoplayPaused, setIsServiceAutoplayPaused] = useState(false);
  const [isDesktopServices, setIsDesktopServices] = useState(false);
  const [serviceHoverSide, setServiceHoverSide] = useState<
    "left" | "right" | null
  >(null);
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const aboutParagraphRef = useRef<HTMLParagraphElement | null>(null);
  const aboutWordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const headerIdleTimerRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

  const serviceCount = focusServices.length;

  const goToService = (index: number) => {
    setActiveServiceIndex((index + serviceCount) % serviceCount);
  };

  const stepService = (direction: "next" | "prev") => {
    setActiveServiceIndex((currentIndex) =>
      direction === "next"
        ? (currentIndex + 1) % serviceCount
        : (currentIndex - 1 + serviceCount) % serviceCount,
    );
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const syncServicesBreakpoint = () => {
      setIsDesktopServices(mediaQuery.matches);
    };

    syncServicesBreakpoint();
    mediaQuery.addEventListener("change", syncServicesBreakpoint);

    return () => {
      mediaQuery.removeEventListener("change", syncServicesBreakpoint);
    };
  }, []);

  useEffect(() => {
    if (isServiceAutoplayPaused) {
      return;
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveServiceIndex(
        (currentIndex) => (currentIndex + 1) % serviceCount,
      );
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [isServiceAutoplayPaused, serviceCount]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const hideFrame = window.requestAnimationFrame(() => {
        setIntroState("hidden");
      });

      return () => {
        window.cancelAnimationFrame(hideFrame);
      };
    }

    const closeTimer = window.setTimeout(() => {
      setIntroState("closing");
    }, 760);

    const hideTimer = window.setTimeout(() => {
      setIntroState("hidden");
    }, 1080);

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const clearHeaderIdleTimer = () => {
      if (headerIdleTimerRef.current !== null) {
        window.clearTimeout(headerIdleTimerRef.current);
        headerIdleTimerRef.current = null;
      }
    };

    const scheduleHeaderIdleHide = (scrollY: number) => {
      clearHeaderIdleTimer();

      if (scrollY <= 24) {
        return;
      }

      headerIdleTimerRef.current = window.setTimeout(() => {
        setIsHeaderVisible(false);
      }, 3000);
    };

    let frameId = 0;
    lastScrollYRef.current = window.scrollY;
    scheduleHeaderIdleHide(lastScrollYRef.current);

    const onScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(window.scrollY, 0);
        const delta = currentScrollY - lastScrollYRef.current;

        if (currentScrollY <= 24) {
          setIsHeaderVisible(true);
        } else if (Math.abs(delta) >= 8) {
          setIsHeaderVisible(delta < 0);
        }

        scheduleHeaderIdleHide(currentScrollY);
        lastScrollYRef.current = currentScrollY;
        frameId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      clearHeaderIdleTimer();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const section = aboutSectionRef.current;
    const paragraph = aboutParagraphRef.current;

    if (!section || !paragraph) {
      return;
    }

    const wordNodes = aboutWordRefs.current.filter(
      (word): word is HTMLSpanElement => word !== null,
    );

    if (wordNodes.length === 0) {
      return;
    }

    let frameId = 0;

    const updateWords = () => {
      const rect = paragraph.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.82;
      const end = viewportHeight * 0.42;
      const totalTravel = rect.height + (start - end);
      const rawProgress = Math.min(
        Math.max((start - rect.top) / Math.max(totalTravel, 1), 0),
        1,
      );
      const progress = Math.min(rawProgress * 1.08, 1);

      wordNodes.forEach((word, index) => {
        const startAt = index / wordNodes.length;
        const endAt = Math.min(startAt + 0.16, 1);
        const opacity = Math.min(
          Math.max(
            (progress - startAt) / Math.max(endAt - startAt, 0.001),
            0.16,
          ),
          1,
        );

        word.style.setProperty("--word-opacity", opacity.toFixed(3));
      });
    };

    const onScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        updateWords();
        frameId = 0;
      });
    };

    updateWords();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <main
      className={cn(
        "overflow-x-clip bg-white font-montserrat",
        montserrat.variable,
        instrumentSerif.variable,
      )}
    >
      {introState !== "hidden" && <IntroLoader state={introState} />}

      <section className="hero-screen relative isolate flex overflow-hidden bg-[#f8f7f3] text-[#171717]">
        <video
          aria-hidden="true"
          autoPlay
          className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-[1.08] object-cover object-center"
          loop
          muted
          playsInline
          src="/videos/logoisum-hero.mp4"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] bg-white/18"
        />
        <Image
          alt="Hoa Linh Studio hero background"
          className="pointer-events-none absolute inset-0 z-[8] h-full w-full object-cover object-center"
          fill
          priority
          sizes="100vw"
          src="/hero.png"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.06)_42%,rgba(248,247,243,0.22)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[160px] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.72)_58%,#ffffff_100%)]"
        />

        <div className="hero-screen relative z-30 flex w-full flex-col px-4 py-4 sm:px-5 sm:py-5">
          <header className="relative z-40 mx-auto h-11 w-full max-w-[1440px] sm:h-12 lg:h-[52px]">
            <div
              className={cn(
                "fixed inset-x-4 top-4 z-50 will-change-transform transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-x-5 sm:top-5",
                isHeaderVisible
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-[calc(100%+24px)] opacity-0",
              )}
            >
              <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
              <nav
                aria-label="Primary"
                className="hidden items-center justify-start gap-1 text-[16px] font-[500] text-black lg:flex"
              >
                <a
                  className="hero-ghost-pill focus-ring inline-flex min-w-20 items-center justify-center rounded-full border border-transparent bg-transparent px-4 py-3 text-[16px] font-[500] text-black/84 transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  href="#about"
                >
                  Giới thiệu
                </a>
                <a
                  className="hero-ghost-pill focus-ring inline-flex min-w-20 items-center justify-center rounded-full border border-transparent bg-transparent px-4 py-3 text-[16px] font-[500] text-black/84 transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  href="#works"
                >
                  Dự án
                </a>
                <a
                  className="hero-ghost-pill focus-ring inline-flex min-w-20 items-center justify-center rounded-full border border-transparent bg-transparent px-4 py-3 text-[16px] font-[500] text-black/84 transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  href="#services"
                >
                  Dịch vụ
                </a>
                <a
                  className="hero-ghost-pill focus-ring inline-flex min-w-20 items-center justify-center rounded-full border border-transparent bg-transparent px-4 py-3 text-[16px] font-[500] text-black/84 transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  href="#insights"
                >
                  Thư viện
                </a>
              </nav>

              <Link
                aria-label="Hoa Linh Studio home"
                className="shrink-0 rounded-md lg:mx-auto"
                href="/"
                locale={locale}
              >
                <Image
                  alt="Hoa Linh Studio logo"
                  className="h-8 max-w-[122px] w-auto object-contain sm:h-10 sm:max-w-[150px] lg:h-11 lg:max-w-none"
                  height={44}
                  priority
                  src="/logo-hoa-linh-full.svg"
                  style={{ width: "auto" }}
                  width={149}
                />
              </Link>

              <div className="flex items-center justify-end lg:min-w-0">
                <a
                  className="header-cta-pill fill-black-pill focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#18181b] px-4 py-2.5 text-[14px] font-[500] text-white sm:min-h-12 sm:px-6 sm:py-3 sm:text-[15px] lg:gap-3 lg:px-7 lg:text-[16px]"
                  href="#contact"
                >
                  <span className="whitespace-nowrap">Đặt lịch tư vấn</span>
                  <ArrowUpRight size={18} strokeWidth={2} />
                </a>
              </div>
              </div>
            </div>
          </header>

          <div className="flex flex-1 items-start justify-center pb-10 pt-10 sm:pb-14 sm:pt-12 lg:pt-10">
            <div className="relative z-20 mx-auto flex w-full max-w-[920px] flex-col items-center px-4 pt-14 text-center sm:pt-18 lg:pt-10">
              <p className="text-[clamp(16px,5vw,38px)] font-[700] uppercase tracking-[-0.05em] text-black/44">
                Welcome to
              </p>
              <Image
                alt="Hoa Linh studio"
                className="mt-2 h-auto w-[clamp(220px,82vw,320px)] sm:w-[clamp(320px,68vw,440px)] md:w-[clamp(420px,58vw,560px)] lg:w-[clamp(520px,48vw,660px)] xl:w-[clamp(620px,42vw,760px)]"
                height={224}
                priority
                src="/logo-hoa-linh-full.svg"
                width={760}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative isolate flex items-center justify-center overflow-hidden bg-white px-4 py-[120px] text-[#27272a] sm:px-6 sm:py-24 lg:min-h-screen lg:px-0 lg:py-0"
        id="about"
        ref={aboutSectionRef}
      >
        <div className="pointer-events-none absolute inset-0">
          <Image
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 h-auto max-w-none w-[200%] -translate-x-1/2 sm:left-0 sm:w-full sm:translate-x-0"
            height={400}
            priority
            src="/floor.svg"
            width={1600}
          />
          <div className="absolute inset-x-0 top-0 h-[160px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.56)_52%,rgba(255,255,255,0)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] lg:px-10 lg:py-25">
          <p
            className="mx-auto max-w-[1200px] text-center text-[20px] font-[700] leading-[1.4] tracking-[-0.03em] text-[#27272a] md:text-[24px] lg:text-[31px] xl:text-[36px]"
            ref={aboutParagraphRef}
          >
            {aboutRevealText.split(" ").map((word, index) => (
              <span
                className="scroll-reveal-word"
                key={`${word}-${index}`}
                ref={(node) => {
                  aboutWordRefs.current[index] = node;
                }}
                style={
                  {
                    "--word-opacity": 0,
                  } as CSSProperties
                }
              >
                <span className="scroll-reveal-word__shadow">{word}</span>
                <span className="scroll-reveal-word__fill">{word}</span>
              </span>
            ))}
          </p>
        </div>
      </section>

      <section
        id="services"
        className="relative isolate z-0 overflow-hidden bg-white text-[#171717] lg:min-h-screen"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
            <Image
              alt=""
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-auto w-full"
              height={400}
              src="/floor.svg"
              width={1600}
            />
          </div>
          <div className="absolute inset-x-0 top-0 h-[160px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.56)_52%,rgba(255,255,255,0)_100%)]" />
        </div>

        <div className="relative z-10 flex flex-col gap-4 pb-16 sm:gap-5 sm:pb-20 lg:min-h-screen lg:justify-center lg:gap-6 lg:pb-24">
          <div
            className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10"
            data-scroll-reveal="enter"
          >
            <SectionTitle title="Dịch vụ trọng tâm" />
          </div>
          <div
            className="relative mx-auto w-full overflow-hidden"
            data-scroll-reveal="enter"
            onMouseEnter={() => {
              if (isDesktopServices) {
                setIsServiceAutoplayPaused(true);
              }
            }}
            onMouseLeave={() => {
              setIsServiceAutoplayPaused(false);
              setServiceHoverSide(null);
            }}
          >
            <div className="relative h-[211px] w-full sm:h-[360px] lg:left-1/2 lg:h-[480px] lg:w-screen lg:-translate-x-1/2 xl:h-[560px]">
              {focusServices.map((service, index) => {
                const rawOffset =
                  (index - activeServiceIndex + serviceCount) % serviceCount;
                const relativeOffset =
                  rawOffset === serviceCount - 1 ? -1 : rawOffset;
                const isActive = relativeOffset === 0;
                const isVisibleSide = Math.abs(relativeOffset) === 1;

                const cardWidth = isActive
                  ? isDesktopServices
                    ? "min(64vw, 1120px)"
                    : "min(calc(100% - 32px), 640px)"
                  : isDesktopServices
                    ? "min(42.666vw, 746px)"
                    : "min(calc(100% - 32px), 640px)";
                const translateX = !isDesktopServices
                  ? "-50%"
                  : relativeOffset === -1
                    ? "calc(-50% - min(33.5vw, 586px))"
                    : relativeOffset === 1
                      ? "calc(-50% + min(33.5vw, 586px))"
                      : "-50%";
                const scale = !isDesktopServices
                  ? 1
                  : relativeOffset === 0
                    ? 1
                    : isVisibleSide
                      ? 1
                      : 0.82;
                const opacity = !isDesktopServices
                  ? isActive
                    ? 1
                    : 0
                  : relativeOffset === 0
                    ? 1
                    : isVisibleSide
                      ? 0.58
                      : 0;

                return (
                  <button
                    className={cn(
                      "service-carousel-card group absolute left-1/2 top-1/2 block overflow-hidden rounded-[8px] text-left transition-[transform,width,opacity,box-shadow,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none max-sm:rounded-[8px] sm:rounded-[10px] lg:rounded-[16px]",
                      isActive
                        ? "service-carousel-card--active z-20 aspect-video"
                        : "z-10 aspect-video",
                      !isActive &&
                        (!isVisibleSide || !isDesktopServices) &&
                        "pointer-events-none z-0",
                      isVisibleSide && isDesktopServices && "cursor-pointer",
                    )}
                    key={service.title}
                    onClick={() => {
                      if (!isActive) {
                        goToService(index);
                      }
                    }}
                    style={{
                      opacity,
                      transform: `translate(${translateX}, -50%) scale(${scale})`,
                      width: cardWidth,
                    }}
                    type="button"
                  >
                    <div className="absolute inset-0">
                      <Image
                        alt={service.title}
                        className={cn(
                          "service-card-media h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isActive ? "scale-100" : "scale-[1.02]",
                        )}
                        fill
                        sizes="(min-width: 1024px) 84vw, 100vw"
                        src={service.image}
                        unoptimized
                      />
                      <div
                        className={cn(
                          "absolute inset-0 transition-[background-color,opacity] duration-500 ease-out",
                          isActive
                            ? "bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.18)_54%,rgba(0,0,0,0.82)_100%)]"
                            : "bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.34)_100%)]",
                        )}
                      />
                    </div>

                    <div
                      className={cn(
                        "service-card-body absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-4 text-center text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-2 sm:pb-2 lg:px-4 lg:pb-4",
                      )}
                    >
                      <span
                        className={cn(
                          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isActive
                            ? "text-[12px] font-[600] uppercase tracking-[0.12em] text-white/78 opacity-100 md:text-[14px]"
                            : "text-[12px] font-[600] uppercase tracking-[0.12em] text-white/78 opacity-100 md:text-[14px]",
                        )}
                      >
                        {service.eyebrow}
                      </span>
                      <h3
                        className={cn(
                          "service-carousel-title mt-2 w-full text-balance font-[700] tracking-[-0.04em] text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isActive
                            ? "max-w-[82%] text-[16px] leading-[1.08] sm:max-w-[76%] sm:text-[18px] lg:max-w-[680px] lg:text-[24px]"
                            : "service-carousel-side-title max-w-[72%] text-[16px] leading-[1.08] sm:text-[18px] lg:text-[24px]",
                        )}
                      >
                        {service.title}
                      </h3>
                      {isActive ? (
                        <p className="service-carousel-description mt-3 w-full max-w-[700px] text-balance text-[14px] text-white/72 sm:text-[15px]">
                          {service.description}
                        </p>
                      ) : null}
                    </div>
                  </button>
                );
              })}

              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-10 bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0)_100%)] lg:block lg:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-10 bg-[linear-gradient(270deg,#ffffff_0%,rgba(255,255,255,0)_100%)] lg:block lg:w-24" />

              <button
                aria-label="Previous service"
                className="service-nav-hit-area absolute top-1/2 left-0 z-30 hidden h-[min(36vw,630px)] w-[calc((100vw-min(64vw,1120px))/2)] -translate-y-1/2 cursor-w-resize lg:block"
                onClick={() => stepService("prev")}
                onMouseEnter={() => {
                  setIsServiceAutoplayPaused(true);
                  setServiceHoverSide("left");
                }}
                onMouseLeave={() => setServiceHoverSide(null)}
                type="button"
              >
                <span
                  className={cn(
                    "service-nav-indicator pointer-events-none absolute top-1/2 left-8 inline-flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#111111] text-white shadow-[0_18px_42px_rgba(0,0,0,0.22)]",
                    serviceHoverSide === "left" ? "opacity-100" : "opacity-0",
                  )}
                >
                  <ArrowLeft size={20} strokeWidth={2.2} />
                </span>
              </button>
              <button
                aria-label="Next service"
                className="service-nav-hit-area absolute top-1/2 right-0 z-30 hidden h-[min(36vw,630px)] w-[calc((100vw-min(64vw,1120px))/2)] -translate-y-1/2 cursor-e-resize lg:block"
                onClick={() => stepService("next")}
                onMouseEnter={() => {
                  setIsServiceAutoplayPaused(true);
                  setServiceHoverSide("right");
                }}
                onMouseLeave={() => setServiceHoverSide(null)}
                type="button"
              >
                <span
                  className={cn(
                    "service-nav-indicator pointer-events-none absolute top-1/2 right-8 inline-flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#111111] text-white shadow-[0_18px_42px_rgba(0,0,0,0.22)]",
                    serviceHoverSide === "right" ? "opacity-100" : "opacity-0",
                  )}
                >
                  <ArrowRight size={20} strokeWidth={2.2} />
                </span>
              </button>

              <button
                aria-label="Previous service"
                className="service-nav-button fill-black-pill absolute left-2 top-1/2 z-30 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#111111] text-white sm:left-4 sm:h-11 sm:w-11 lg:hidden"
                onClick={() => stepService("prev")}
                type="button"
              >
                <ArrowLeft size={18} strokeWidth={2.2} />
              </button>
              <button
                aria-label="Next service"
                className="service-nav-button fill-black-pill absolute right-2 top-1/2 z-30 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#111111] text-white sm:right-4 sm:h-11 sm:w-11 lg:hidden"
                onClick={() => stepService("next")}
                type="button"
              >
                <ArrowRight size={18} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          <div
            className="mx-auto max-w-[1320px] px-4 text-center sm:px-6 lg:px-10"
            data-scroll-reveal="enter"
          >
            <OutlinePillButton href="#contact" label="Xem thêm" />
          </div>
        </div>
      </section>

      <FeaturedProjectsSection />

      <section
        id="insights"
        className="relative isolate z-0 bg-white text-[#171717]"
      >
        <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div data-scroll-reveal="enter">
            <SectionTitle title="Thư viện" />
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:gap-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {insightCards.map((card) => (
                <article data-scroll-reveal="enter" key={card.title}>
                  <Link
                    className="insight-card group block rounded-[18px] outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4"
                    href={card.href}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-[18px] bg-[#efefef]">
                      <Image
                        alt={card.title}
                        className="insight-card-media object-cover transition-transform duration-300 ease-out group-focus-visible:scale-[1.03]"
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                        src={card.image}
                      />
                      <div className="insight-card-overlay absolute inset-0 bg-black/0 transition-colors duration-300 group-focus-visible:bg-black/10" />
                      <div className="absolute bottom-3 right-3 rounded-[6px] bg-black/82 px-1.5 py-1 text-[12px] font-[700] leading-none tracking-[0.01em] text-white">
                        {card.duration}
                      </div>
                    </div>

                    <div className="mt-3 flex items-start gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-[700] tracking-[0.08em] text-white"
                        style={{ background: card.avatarColor }}
                      >
                        {card.avatarLabel}
                      </div>
                      <div className="min-w-0 pr-2">
                        <h3 className="line-clamp-2 text-[17px] font-[600] leading-[1.35] tracking-[-0.02em] text-[#0f0f0f] sm:text-[18px]">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-[13px] leading-[1.4] text-[#606060] sm:text-[14px]">
                          {card.channel}
                        </p>
                        <p className="text-[13px] leading-[1.4] text-[#606060] sm:text-[14px]">
                          {card.views} lượt xem • {card.publishedAt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <div
              className="flex justify-center pt-2 sm:pt-3"
              data-scroll-reveal="enter"
            >
              <OutlinePillButton href="#contact" label="Xem thêm" />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white text-[#171717]">
        <div className="relative overflow-hidden bg-[#eef3fb]">
          <div className="absolute inset-0">
            <Image
              alt="Hoa Linh Studio CTA background"
              className="object-cover object-center"
              fill
              priority={false}
              sizes="100vw"
              src="/cta-banner.jpg"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_32%,rgba(255,255,255,0)_100%)]" />
          </div>

          <div
            className="relative flex min-h-[280px] flex-col items-center justify-start px-[40px] pt-[56px] text-center sm:min-h-[360px] sm:px-6 lg:min-h-[420px] lg:px-10"
            data-scroll-reveal="enter"
          >
            <h2 className="text-[24px] font-[700] uppercase text-[#27272a] sm:text-[42px] lg:text-[48px]">
              Trực quan hoá ý tưởng của bạn
            </h2>
            <a
              className="fill-black-pill focus-ring mt-4 inline-flex items-center gap-2 rounded-full bg-[#18181b] px-6 py-4 text-[16px] font-[600] text-white"
              href="mailto:hello@hoalinh.vn"
            >
              <span>Liên hệ ngay</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-[1320px] px-4 pt-6 pb-16 sm:px-6 md:pt-8 sm:pb-20 xl:pt-10 lg:px-10 lg:pb-24">
          <footer data-scroll-reveal="skip">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_0.8fr_1.45fr] lg:items-start">
              <div className="flex flex-col items-center gap-5 text-center md:col-span-2 lg:col-span-1 lg:items-start lg:text-left">
                <Image
                  alt="Hoa Linh Studio"
                  className="h-[56px] w-auto object-contain sm:h-[64px] lg:h-[70px]"
                  height={70}
                  src="/logo-hoa-linh-full.svg"
                  style={{ width: "auto" }}
                  width={320}
                />
                <div className="flex flex-wrap items-center justify-center gap-2 text-black/60 lg:justify-start">
                  <SocialPill icon={<MessageCircle size={18} />} />
                  <SocialPill icon={<Camera size={18} />} />
                  <SocialPill icon={<CirclePlay size={18} />} />
                  <SocialPill icon={<Mail size={18} />} />
                  <SocialPill icon={<Phone size={18} />} />
                </div>
              </div>

              <FooterColumn
                items={[
                  "Giới thiệu",
                  "Dự án",
                  "Blog",
                  "Liên hệ",
                  "Báo giá",
                  "Chính sách bảo mật",
                ]}
                title="Thông tin chung"
              />
              <FooterColumn
                items={[
                  "Sản xuất phim",
                  "Viết kịch bản",
                  "Hậu kỳ & kỹ thuật số",
                  "Khoá học",
                  "Coaching",
                ]}
                title="Dịch vụ"
              />

              <div className="space-y-5 md:col-span-2 lg:col-span-1">
                <FooterHeading>Liên hệ</FooterHeading>
                <div className="space-y-3 md:flex md:flex-wrap md:items-center md:gap-x-8 md:gap-y-3 md:space-y-0 lg:block lg:space-y-3">
                  <FooterContact icon={<Phone size={18} />} text="0123456789" />
                  <FooterContact
                    icon={<Mail size={18} />}
                    text="abc@gmail.com"
                  />
                  <FooterContact
                    icon={<MapPin size={18} />}
                    text="123 abc, bcd, Hồ Chí Minh"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    className="h-14 w-full min-w-0 rounded-full border border-black/10 bg-white px-4 text-[14px] text-black placeholder:text-black/40 transition-colors duration-200 ease-in-out focus:border-[#111111] focus:outline-none sm:flex-1"
                    placeholder="Nhập email để nhận tư vấn"
                    type="email"
                  />
                  <button
                    className="footer-fill-button fill-black-pill inline-flex h-14 w-full items-center justify-center rounded-full bg-[#111111] px-6 text-[14px] font-[600] text-white focus:outline-none sm:w-auto sm:min-w-[120px]"
                    type="button"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-center text-[30px] font-[700] tracking-[-0.04em] text-[#171717] sm:text-[36px] lg:text-[40px]">
      {title}
    </h2>
  );
}

function OutlinePillButton({ href, label }: { href: string; label: string }) {
  return (
    <a className="radiant-outline-pill px-5 py-3 text-[15px]" href={href}>
      <span>{label}</span>
      <span aria-hidden="true" className="radiant-outline-pill__icon">
        <ArrowUpRight size={18} />
      </span>
    </a>
  );
}

function FooterColumn({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <FooterHeading>{title}</FooterHeading>
      <ul className="mt-4 space-y-2 text-[14px] text-black/55">
        {items.map((item) => (
          <li key={item}>
            <a className="footer-text-link" href="#contact">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[16px] leading-none font-[700] text-[#171717]">
      {children}
    </p>
  );
}

function FooterContact({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <a
      className="footer-text-link footer-contact-row items-center gap-3 text-[14px]"
      href="#contact"
    >
      <span className="text-black/70">{icon}</span>
      <span>{text}</span>
    </a>
  );
}

function SocialPill({ icon }: { icon: React.ReactNode }) {
  return (
    <span className="footer-social-pill flex h-10 w-10 items-center justify-center rounded-full bg-white text-black/70 shadow-[0_12px_24px_rgba(0,0,0,0.04)]">
      {icon}
    </span>
  );
}

function IntroLoader({ state }: { state: "visible" | "closing" }) {
  return (
    <div
      className={cn(
        "intro-loader fixed inset-0 z-[120] flex items-center justify-center bg-[#111111]",
        state === "closing" && "intro-loader--closing",
      )}
    >
      <div className="intro-loader__core">
        <div className="intro-loader__ring" aria-hidden="true" />
        <svg
          aria-hidden="true"
          className="intro-loader__logo"
          viewBox="0 0 542 542"
        >
          <path
            className="intro-loader__path"
            d={introVectorPath}
            pathLength={1}
          />
        </svg>
      </div>
    </div>
  );
}
