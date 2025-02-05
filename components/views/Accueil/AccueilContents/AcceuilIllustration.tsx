"use client"
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useInView } from 'react-intersection-observer'

type AcceuilIllustrationProps = {
    className: string;
}

const AcceuilIllustration: React.FC<AcceuilIllustrationProps> = ({ className }) => {

    // Utiliser useRef pour stocker les références aux timelines
    const masterTimelineRef = useRef<GSAPTimeline | null>(null);
    const [started, setStarted] = useState(false);

    const { ref: svgRef, inView } = useInView({
        threshold: 0.5, // 50% visibility threshol
    });

    // Séparer les configurations d'animation pour plus de clarté
    const animationConfig = {
        cactus: {
            duration: 1,
            rotationOrigin: "bottom center",
            initialScale: 0.7
        },
        screens: {
            ease: "elastic.out(1, 0.75)",
            duration: 0.8,
            floatingDuration: { min: 2, max: 4 }
        },
        eyes: {
            blinkDuration: 0.1,
            delayRange: { min: 1, max: 3 }
        }
    };

    // Séparer les animations en fonctions réutilisables
    const createCactusAnimation = () => {
        const timeline = gsap.timeline({
            defaults: { duration: animationConfig.cactus.duration }
        });

        timeline
            .fromTo("#cactus_1",
                { y: '100%', scale: animationConfig.cactus.initialScale },
                { y: 0, scale: 1 })
            .fromTo("#cactus_1_epines",
                { opacity: 0 },
                { opacity: 1, duration: 0.8 },
                "<50%")
            .fromTo("#cactus_2",
                { scale: 0, x: "100%", y: "100%" },
                { scale: 1, x: 0, y: 0, duration: 0.5 },
                "<50%")
            .set(["#cactus_1", "#cactus_2"], {
                transformOrigin: animationConfig.cactus.rotationOrigin
            })
            .to(["#cactus_1", "#cactus_2"], {
                rotateZ: gsap.utils.wrap([-2, -8]),
                duration: gsap.utils.wrap([1, 1.1]),
                repeat: -1,
                yoyo: true
            });

        return timeline;
    };

    const createScreensAnimation = () => {
        const allScreens = gsap.utils.toArray('._screen') as Element[];
        const timeline = gsap.timeline({
            defaults: {
                ease: animationConfig.screens.ease,
                duration: animationConfig.screens.duration
            }
        });

        // Configuration initiale
        timeline.set(allScreens, {
            transformOrigin: "center center",
            scale: 0,
            opacity: 0,
            display: "flex"
        });

        // Animation principale
        timeline
            .to(["#screen_left_2", "#screen_left_3", "#screen_left_4"], {
                scale: 1,
                opacity: 1,
                stagger: { amount: 0.6, from: 'center' }
            })
            .to("#screenr_ight_1", {
                scale: 1,
                opacity: 1
            }, "-=0.5");

        // Animation flottante
        allScreens.forEach((screen, index) => {
            const duration = gsap.utils.random(
                animationConfig.screens.floatingDuration.min,
                animationConfig.screens.floatingDuration.max
            );

            gsap.to(screen, {
                y: "random(-10, 10)",
                x: "random(-5, 5)",
                duration,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.2,
            });
        });

        return timeline;
    };

    const createEyesAnimation = () => {
        const eyes = ["#oeuil_gauche", "#oeuil_droite"];

        const blink = () => {
            const timeline = gsap.timeline({
                defaults: {
                    transformOrigin: "center center",
                    ease: "power1.inOut",
                    duration: animationConfig.eyes.blinkDuration
                }
            });

            timeline
                .to(eyes, { scaleY: 0.2 })
                .to(eyes, { scaleY: 1 });

            gsap.delayedCall(
                gsap.utils.random(
                    animationConfig.eyes.delayRange.min,
                    animationConfig.eyes.delayRange.max
                ),
                blink
            );
        };

        return blink;
    };

    const createCodeAnimation = () => {
        const codeTimeline = gsap.timeline({
            defaults: {
                ease: "power1.inOut"
            }
        });

        codeTimeline.set([
            "#code_blanc path",
            "#codes path",
            "#content #codes_block path"
        ], {
            strokeDasharray: function (index, element) {
                return element.getTotalLength();
            },
            strokeDashoffset: function (index, element) {
                return element.getTotalLength();
            },
            display: "flex"
        });

        // Code animations with floating effect
        codeTimeline
            .to("#code_blanc path", {
                strokeDashoffset: 0,
                duration: 0.5,
                stagger: {
                    amount: 0.3,
                    from: "start"
                }
            })
            .to("#content #codes_block path", {
                strokeDashoffset: 0,
                duration: 0.5,
                stagger: {
                    amount: 0.3,
                    from: "random"
                }
            }, "-=0.3")
            .to("#codes path", {
                strokeDashoffset: 0,
                duration: 2,
                repeat: -1,
                repeatDelay: 1,
                yoyo: true,
                stagger: {
                    amount: 0.4,
                    from: "random",
                    repeat: -1
                }
            }, "-=0.2");

        return codeTimeline;
    }

    const createLogoAnimation = () => {
        const timeline = gsap.timeline()

        timeline
            .set("#logo_nextjs", { scale: 0, transformOrigin:"center center" })
            .to("#logo_nextjs", { opacity: 1, scale: 1, ease: "bounce.out", duration: 1 })
        return timeline
    }

    useEffect(() => {
        if (inView && !started) {

            // Créer la timeline principale
            masterTimelineRef.current = gsap.timeline();

            // Animation initiale 
            masterTimelineRef.current
                .set("#illustration", { display: "flex" })
                .fromTo("#illustration",
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5, ease: "power2.inOut" }
                )
                .add(createCactusAnimation())
                .add(createScreensAnimation(), "<")
                .add(createEyesAnimation(), "<")
                .add(createCodeAnimation(), "<")
                .add(createLogoAnimation(), "+1");

                console.log(masterTimelineRef.current.totalDuration() / 1000);
                
            setStarted(true)
        } else if (inView && started) {
            masterTimelineRef.current?.play()
        }
        else {
            // Arrêter l'animation si le SVG n'est plus visible
            masterTimelineRef.current?.pause();
        }

        // Cleanup
        return () => {
            masterTimelineRef.current?.kill();
        };
    }, [inView]);

    return <svg ref={svgRef} id='svg-illustration' className={className + " overflow-visible "} viewBox="0 0 746 556" fill="none">
        <g className='hidden' id="illustration">
            <g id="cactus_2">
                <path id="Vector 29" d="M614.722 416.122C615.505 413.296 619.288 409.225 621.082 407.542C619.517 406.735 619.125 406.028 619.125 405.776V402.495C618.391 399.215 617.413 390.635 608.852 391.14C602.003 391.544 599.801 395.514 599.557 397.448L599.801 408.299C600.975 414.961 610.238 416.29 614.722 416.122Z" fill="#4BBD75" stroke="#4BBD75" strokeLinecap="round" />
                <path id="Vector 30" d="M602.736 410.066L605.427 412.589M609.341 404.262L610.564 404.514L611.053 406.533M616.679 398.458C616.679 398.878 616.777 399.82 617.168 400.224M600.29 397.953C600.943 398.29 602.296 399.215 602.492 400.224M607.139 392.401C608.281 392.233 610.564 391.998 610.564 392.401" stroke="#4A875E" strokeWidth="3" strokeLinecap="round" />
            </g>
            <g id="cactus_1">
                <path id="Vector 27" d="M645.298 458.264H617.413C603.47 458.264 610.564 416.375 622.061 408.299C631.258 401.839 640.977 407.374 645.298 411.832C657.627 440.297 650.435 454.647 645.298 458.264Z" fill="#4BBD75" stroke="#4BBD75" strokeWidth="5" strokeLinecap="round" />
                <path id="cactus_1_epines" d="M614.722 437.067L617.902 439.843M619.125 456.245H624.262M633.802 448.423V443.123M644.565 454.984H647.255M652.392 440.6H656.55M644.565 429.244H649.701M632.334 430.758V428.235M617.902 417.889L623.284 422.683M634.78 409.813V404.766M644.565 416.374L648.234 414.356M611.053 425.711C609.993 424.702 607.971 422.683 608.363 422.683M624.262 405.523L622.794 404.262" stroke="#4A875E" strokeWidth="5" strokeLinecap="round" />
            </g>
            <g id="vase">
                <path id="Vector 25" d="M593.197 520.09V460.031H671.227V518.828C666.726 528.114 658.752 533.969 655.327 535.735H605.672C596.866 530.89 593.686 523.286 593.197 520.09Z" fill="#2C9686" />
                <path id="Vector 26" d="M599 480H665" stroke="#FFFDFE" strokeWidth="12" strokeLinecap="square" />
            </g>
            <g id="cup">
                <path id="Vector 23" d="M75.8502 455.741L83.6776 536.492H136.024L142.384 455.741H75.8502Z" fill="#2C9686" />
                <path id="Vector 24" d="M132.41 471.386C145.118 477.494 162.556 495.534 130.642 518.828" stroke="url(#paint0_linear_27_367)" strokeWidth="9" strokeLinecap="round" />
            </g>
            <path id="table" d="M21.0579 542.549H722.839" stroke="#383840" strokeWidth="25" strokeLinecap="round" />
            <g className='_roue hidden' id="roue_4">
                <path id="Vector 31" d="M675.875 351.016L668.781 346.474M684.436 342.184L679.788 335.371M694.954 339.156V329.314M707.674 341.427L709.875 330.324M718.926 344.455L724.062 337.137M724.062 354.549L733.113 347.988M728.955 365.4H738.25M726.264 378.775L735.804 381.803M719.904 389.626L726.264 396.187M711.587 396.187L712.81 404.262M697.645 399.215V407.542M688.594 392.906L682.968 403M680.767 388.112L670.738 393.663M673.673 376.504L663.4 378.775M672.695 363.129L661.932 361.615" stroke="#DCDDF2" strokeWidth="13" strokeLinecap="round" />
                <g id="Ellipse 17">
                    <mask id="path-11-inside-1_27_367" fill="white">
                        <ellipse cx="700.335" cy="367.671" rx="34.0006" ry="35.0764" />
                    </mask>
                    <path d="M694.336 367.671C694.336 366.725 694.744 365.575 695.656 364.634C696.59 363.67 698.273 362.748 700.335 362.748V442.748C742.37 442.748 774.336 407.951 774.336 367.671H694.336ZM700.335 362.748C702.397 362.748 704.081 363.67 705.015 364.634C705.927 365.575 706.335 366.725 706.335 367.671H626.335C626.335 407.951 658.301 442.748 700.335 442.748V362.748ZM706.335 367.671C706.335 368.617 705.927 369.768 705.015 370.709C704.081 371.672 702.397 372.595 700.335 372.595V292.595C658.301 292.595 626.335 327.391 626.335 367.671H706.335ZM700.335 372.595C698.273 372.595 696.59 371.672 695.656 370.709C694.744 369.768 694.336 368.617 694.336 367.671H774.336C774.336 327.391 742.37 292.595 700.335 292.595V372.595Z" fill="url(#paint1_radial_27_367)" mask="url(#path-11-inside-1_27_367)" />
                </g>
            </g>
            <g className='_roue hidden' id="roue_3">
                <path id="Vector 31_2" d="M528.931 32.5098L522.924 28.6631M536.181 25.0302L532.245 19.2603M545.088 22.4658V14.1315M555.86 24.3891L557.724 14.9863M565.389 26.9535L569.739 20.7562M569.739 35.5016L577.403 29.9454M573.882 44.6907H581.753M571.603 56.0169L579.682 58.5813M566.217 65.206L571.603 70.7623M559.174 70.7623L560.21 77.6007M547.367 73.3267V80.3788M539.703 67.9842L534.938 76.5322M533.074 63.9238L524.581 68.6253M527.067 54.0936L518.367 56.0169M526.238 42.7674L517.124 41.4852" stroke="#DCDDF2" strokeWidth="13" strokeLinecap="round" />
                <g id="Ellipse 17_2">
                    <mask id="path-14-inside-2_27_367" fill="white">
                        <ellipse cx="549.646" cy="46.6141" rx="28.7934" ry="29.7045" />
                    </mask>
                    <path d="M538.439 46.6141C538.439 42.1117 542.291 36.3185 549.646 36.3185V116.319C588.805 116.319 618.439 83.9271 618.439 46.6141H538.439ZM549.646 36.3185C557 36.3185 560.852 42.1117 560.852 46.6141H480.852C480.852 83.9271 510.487 116.319 549.646 116.319V36.3185ZM560.852 46.6141C560.852 51.1164 557 56.9096 549.646 56.9096V-23.0904C510.487 -23.0904 480.852 9.30106 480.852 46.6141H560.852ZM549.646 56.9096C542.291 56.9096 538.439 51.1164 538.439 46.6141H618.439C618.439 9.30106 588.805 -23.0904 549.646 -23.0904V56.9096Z" fill="url(#paint2_radial_27_367)" mask="url(#path-14-inside-2_27_367)" />
                </g>
            </g>
            <g className='_roue hidden' id="roue_2">
                <path id="Vector 31_3" d="M18.4621 413.22L12.5647 409.443M25.5798 405.877L21.7159 400.212M34.3243 403.359V395.177M44.8991 405.248L46.7293 396.017M54.2537 407.765L58.5243 401.681M58.5243 416.157L66.0487 410.702M62.5915 425.178H70.3193M60.3546 436.297L68.2856 438.815M55.0672 445.319L60.3546 450.773M48.1529 450.773L49.1697 457.487M36.5613 453.291V460.214M29.0369 448.046L24.3596 456.438M22.5294 444.06L14.1915 448.675M16.6319 434.409L8.09071 436.297M15.8184 423.29L6.87054 422.031" stroke="#DCDDF2" strokeWidth="13" strokeLinecap="round" />
                <g id="Ellipse 17_3">
                    <mask id="path-17-inside-3_27_367" fill="white">
                        <ellipse cx="38.7983" cy="427.066" rx="28.2672" ry="29.1616" />
                    </mask>
                    <path d="M27.0655 427.066C27.0655 422.264 31.153 416.228 38.7983 416.228V496.228C77.6666 496.228 107.065 464.08 107.065 427.066H27.0655ZM38.7983 416.228C46.4435 416.228 50.5311 422.264 50.5311 427.066H-29.4689C-29.4689 464.08 -0.0700703 496.228 38.7983 496.228V416.228ZM50.5311 427.066C50.5311 431.868 46.4435 437.905 38.7983 437.905V357.905C-0.0700703 357.905 -29.4689 390.053 -29.4689 427.066H50.5311ZM38.7983 437.905C31.153 437.905 27.0655 431.868 27.0655 427.066H107.065C107.065 390.053 77.6666 357.905 38.7983 357.905V437.905Z" fill="url(#paint3_radial_27_367)" mask="url(#path-17-inside-3_27_367)" />
                </g>
            </g>
            <g className='_roue hidden' id="roue_1">
                <path id="Vector 31_4" d="M89.5132 388.358L86.7931 386.616M92.7961 384.971L91.014 382.359M96.8294 383.81V380.036M101.707 384.681L102.551 380.423M106.021 385.842L107.991 383.036M107.991 389.713L111.462 387.197M109.867 393.874H113.431M108.835 399.002L112.493 400.163M106.397 403.163L108.835 405.679M103.208 405.679L103.677 408.776M97.8612 406.84V410.033M94.3907 404.421L92.2333 408.292M91.3892 402.583L87.5435 404.711M88.6691 398.131L84.7296 399.002M88.2939 393.003L84.1668 392.422" stroke="#DCDDF2" strokeWidth="13" strokeLinecap="round" />
                <g id="Ellipse 17_4">
                </g>
            </g>
            <g className='_screen hidden' id="screen_left_3">
                <path id="Vector 37" d="M138.959 116.332H151.679M156.326 116.332H161.952M107.649 127.688H120.369" stroke="url(#paint4_linear_27_367)" strokeWidth="6" />
                <path id="Vector 38" d="M106.182 137.782H121.347M138.47 137.782H143.607M148.01 137.782H153.146" stroke="url(#paint5_linear_27_367)" strokeWidth="6" />
                <path id="Vector 34" d="M92.2389 78.7326V170.083H252.947V78.7326M92.2389 78.7326H252.947M92.2389 78.7326C91.9128 72.5081 93.462 63.5918 100.556 62.0777C107.848 60.5213 198.399 61.7412 242.673 62.0777C246.994 61.6571 255.099 64.3993 252.947 78.7326" stroke="#61606B" strokeWidth="6" />
                <path id="Vector 35" d="M107.405 105.482H120.124M131.865 105.482H168.801M177.118 105.482H182.255M186.902 105.482H201.334" stroke="url(#paint6_linear_27_367)" strokeWidth="6" />
                <path id="Vector 36" d="M107.16 116.332H120.369M146.297 127.688H171.981" stroke="url(#paint7_linear_27_367)" strokeWidth="6" />
            </g>
            <g className='_screen hidden' id="screen_left_2">
                <path id="Rectangle 15" d="M0.489197 182.503C0.489197 170.905 9.89122 161.503 21.4892 161.503H234.86C246.458 161.503 255.86 170.905 255.86 182.503V189.261H0.489197V182.503Z" fill="#61616B" />
                <path id="Rectangle 16" d="M0 189.261H255.86V331.989C255.86 355.738 236.609 374.989 212.86 374.989H43C19.2518 374.989 0 355.738 0 331.989V189.261Z" fill="#DCDDF2" />
                <g id="content">
                    <g id="codes_block">
                        <rect id="Rectangle 17" x="19.5687" y="212.477" width="77.2962" height="128.193" fill="#60B8AB" />
                        <path className='hidden' id="Vector 32" d="M30.0869 223.833V231.151M30.0869 239.226V248.311M30.0869 256.133V264.209M30.0869 271.779V279.349M30.0869 287.425V296.762M30.0869 304.584V312.912M30.0869 319.725V329.314" stroke="#FCFFFF" strokeWidth="5" />
                        <path className='hidden' id="Vector 33" d="M39.382 227.618H56.7492M63.5982 227.618H70.2027M75.584 227.618H89.7713M48.1879 243.516H66.2889M55.7708 259.919H62.8644M37.6697 276.321H56.7492M60.6629 276.321H73.6272M78.5193 276.321H82.6777M86.1022 276.321H90.5051M45.2526 291.967H75.3394M37.6697 308.369H56.7492M38.159 324.52H56.7492" stroke="#61606B" strokeWidth="6" />
                    </g>
                    <rect id="Rectangle 18" x="108.606" y="212.477" width="40.1158" height="128.193" fill="white" />
                    <rect id="Rectangle 19" x="158.995" y="270.013" width="75.3394" height="70.6575" fill="white" />
                    <rect id="Rectangle 20" x="158.995" y="212.477" width="75.3394" height="46.9368" fill="white" />
                </g>
            </g>
            <g className='_screen hidden' id="screen_left_4">
                <rect id="Rectangle 21" x="130.153" width="148.722" height="95.3876" rx="11" fill="#DCDDF2" />
                <g id="code_blanc">
                    <path className='hidden' id="Vector 39" d="M153.636 14.8885H178.586" stroke="url(#paint8_linear_27_367)" strokeWidth="6" />
                    <path className='hidden' id="Vector 41" d="M153.636 79.2372H178.586" stroke="url(#paint9_linear_27_367)" strokeWidth="6" />
                    <path className='hidden' id="Vector 40" d="M165.132 27.0873H213.32M218.457 27.0873H225.061M237.536 27.0873H266.155M165.132 39.5911H200.845M205.248 39.5911H225.061M193.018 52.0949H206.96M157.549 64.5987H167.089M173.693 64.5987H188.37M191.305 64.5987H194.974M198.644 64.5987H232.889" stroke="url(#paint10_linear_27_367)" strokeWidth="6" />
                </g>
            </g>
            <g className='_screen hidden' id="screenr_ight_1">
                <g id="code_content">
                    <path id="Rectangle 11" d="M454.493 98.9158H743.599V252.144C743.599 269.541 729.496 283.644 712.099 283.644H485.993C468.596 283.644 454.493 269.541 454.493 252.144V98.9158Z" fill="#E8E9EB" stroke="#E8E9EB" />
                    <g id="codes">
                        <path className='hidden' id="lines_2" d="M486.281 117.847H498.267M486.281 135.511H499.001M486.281 152.923H499.001M486.281 169.578H499.001M486.281 185.728H499.001M486.281 202.636H499.001M486.281 220.048H498.267M486.281 237.712H499.001M486.281 253.61H499.001" stroke="#61616B" strokeWidth="6" strokeLinecap="square" />
                        <path className='hidden' id="lines_1" d="M475.029 253.61H476.252M475.519 237.712H476.742M475.519 220.048H476.742M475.519 202.888H476.742M475.519 185.728H476.742M475.519 152.923H476.742M475.519 169.578H476.742M475.519 134.754H476.742M475.519 117.594H476.742" stroke="#40B3A2" strokeWidth="6" strokeLinecap="square" />
                        <path className='hidden' id="code_1" d="M524.93 237.712H559.419M555.506 220.048H564.311M539.361 202.888H611.521M576.053 152.418H577.765M555.506 152.418H564.311M539.361 134.754H596.844M525.419 117.594H560.398" stroke="#40B3A2" strokeWidth="6" strokeLinecap="square" />
                        <path className='hidden' id="code_2" d="M522.483 254.367H536.915M547.678 254.367H557.218M578.254 117.847H594.154M612.499 117.847H613.722M628.154 117.847H672.428M686.371 117.847H706.918" stroke="#FFFFFE" strokeWidth="6" strokeLinecap="square" />
                        <path className='hidden' id="code_3" d="M608.096 134.754H644.298M656.773 134.754H662.889M589.261 151.661H616.168M577.276 169.326H594.887M608.096 169.326H642.097M594.887 186.485H608.096M625.708 202.636H659.464M673.162 202.636H690.774M579.233 236.703H593.664M612.255 236.703H613.967M625.708 236.703H673.162" stroke="#61616B" strokeWidth="6" strokeLinecap="square" />
                    </g>
                </g>
                <g id="header">
                    <path id="Rectangle 10" d="M474.993 68.634H723.099C734.421 68.634 743.599 77.8122 743.599 89.134V104.982H454.493V89.134C454.493 77.8122 463.671 68.634 474.993 68.634Z" fill="#61616B" stroke="#61616B" />
                    <g id="btns">
                        <rect id="Rectangle 12" x="474.46" y="79.1111" width="5.05164" height="2.77583" rx="1.38792" stroke="white" strokeWidth="2.77583" strokeLinejoin="round" />
                        <rect id="Rectangle 13" x="485.223" y="79.1111" width="5.05164" height="2.77583" rx="1.38792" stroke="white" strokeWidth="2.77583" strokeLinejoin="round" />
                        <rect id="Rectangle 14" x="495.986" y="79.1111" width="5.05164" height="2.77583" rx="1.38792" stroke="white" strokeWidth="2.77583" strokeLinejoin="round" />
                    </g>
                </g>
            </g>
            <g id="tete">
                <path id="Vector 13" d="M291.35 221.057C276.674 206.673 284.909 189.934 290.861 188.504L292.573 188.252L303.336 198.598C306.434 199.944 311.897 200.819 308.962 193.551L308.717 179.924L309.696 173.363C311.897 171.513 316.398 166.802 316.789 162.765C323.394 161.923 337.092 157.061 339.049 144.343H342.718C349.404 150.82 367.717 160.392 387.481 146.867H389.193C390.172 148.381 392.324 156.86 393.107 178.662C393.189 179.84 393.499 181.741 394.086 179.924C394.819 177.653 399.222 178.158 400.445 179.924C401.668 181.691 404.848 198.346 394.819 206.673C394.575 212.309 393.89 224.388 393.107 227.618C392.129 231.656 384.301 254.115 379.654 255.629L380.143 281.873L379.654 307.865C374.762 325.529 337.826 347.483 301.624 305.341L302.847 223.328C295.411 223.732 294.041 222.571 291.35 221.057Z" fill="#FF9F77" stroke="#FF9F77" />
                <g id="Vector 12">
                    <path d="M325.009 178.683C320.312 182.115 323.052 182.973 325.009 182.973C328.433 182.132 336.847 179.924 343.207 179.924C351.538 179.924 359.009 173.636 350.203 172.375C341.397 171.113 330.879 174.393 325.009 178.683Z" fill="#141831" />
                    <path d="M364.733 175.13C366.298 176.139 379.898 175.55 386.503 175.13C385.606 174.211 382.883 171.967 379.164 170.335C375.446 168.703 371.745 169.655 370.359 170.335C367.831 171.513 363.167 174.12 364.733 175.13Z" fill="#141831" />
                    <path d="M325.009 178.683C320.312 182.115 323.052 182.973 325.009 182.973C328.433 182.132 336.847 179.924 343.207 179.924C351.538 179.924 359.009 173.636 350.203 172.375C341.397 171.113 330.879 174.393 325.009 178.683Z" stroke="#2F3447" />
                    <path d="M364.733 175.13C366.298 176.139 379.898 175.55 386.503 175.13C385.606 174.211 382.883 171.967 379.164 170.335C375.446 168.703 371.745 169.655 370.359 170.335C367.831 171.513 363.167 174.12 364.733 175.13Z" stroke="#2F3447" />
                </g>
                <path id="Vector 10" d="M341.25 127.688C347.317 106.895 379.328 105.566 394.575 107.5C397.706 112.749 395.879 120.118 394.575 123.146C411.991 131.019 403.462 147.455 397.021 154.689C401.522 168.417 396.45 176.223 393.352 178.41C392.373 152.772 390.172 146.53 389.193 146.614H387.481C369.087 160.544 349.812 150.736 342.473 144.091H338.804C338.021 156.002 323.638 161.335 316.545 162.512C313.609 175.231 299.504 178.41 292.818 178.41V187.999C276.38 172.051 289.882 159.148 298.688 154.689C301.232 124.004 328.123 123.903 341.25 127.688Z" fill="#141831" stroke="#141831" />
                <g id="Vector 11">
                    <path d="M303.58 198.346L292.818 187.999L293.307 178.662C301.888 178.47 307.446 175.358 309.43 173.61C309.315 174.597 308.764 177.945 308.473 179.672L308.717 193.299C309.37 194.308 310.429 196.731 309.451 198.346C308.473 199.961 305.13 199.019 303.58 198.346Z" fill="#2F3447" />
                    <path d="M291.839 145.605C282.055 145.605 283.196 164.615 284.99 174.12C284.99 164.026 293.959 156.961 298.444 154.689C300.401 125.596 327.797 124.23 341.25 127.183C347.904 106.996 379.246 105.481 394.086 107.248C389.438 100.687 386.503 97.911 380.387 96.1446C366.985 92.2732 354.948 94.8829 346.387 100.687C339.326 106.405 336.009 114.548 333.912 120.875C305.342 109.57 293.959 132.651 291.839 145.605Z" fill="#2F3447" />
                    <path d="M309.451 173.363C309.451 173.767 308.799 177.737 308.473 179.672L308.717 193.299C309.37 194.308 310.429 196.731 309.451 198.346C308.473 199.961 305.13 199.019 303.58 198.346L292.818 187.999L293.307 178.662C302.308 178.461 307.983 175.045 309.696 173.363M284.99 174.12C283.196 164.615 282.055 145.605 291.839 145.605C293.959 132.651 305.342 109.57 333.912 120.875C336.009 114.548 339.326 106.405 346.387 100.687C354.948 94.8829 366.985 92.2732 380.387 96.1446C386.503 97.911 389.438 100.687 394.086 107.248C379.246 105.481 347.904 106.996 341.25 127.183C327.797 124.23 300.401 125.596 298.444 154.689C293.959 156.961 284.99 164.026 284.99 174.12Z" stroke="#2F3447" />
                </g>
                <path id="oeuil_droite" d="M340.761 187.242C338.217 187.04 338.397 192.71 338.804 195.57C339.391 197.992 341.006 200.112 341.739 200.869C343.126 201.794 346.436 201.273 345.653 194.813C344.675 186.738 343.941 187.495 340.761 187.242Z" fill="#070709" />
                <path id="oeuil_gauche" d="M373.538 181.943C370.864 182.499 371.663 187.411 372.071 190.271C372.658 192.693 373.538 194.56 374.272 195.317C375.658 196.243 378.724 194.964 377.942 188.504C376.963 180.429 375.99 181.433 373.538 181.943Z" fill="#070709" />
                <path id="Vector 16" d="M362.287 183.962C362.694 186.99 363.803 193.652 364.977 196.075C366.445 199.103 370.603 203.897 364.488 208.692C363.102 209.112 359.889 209.701 358.128 208.692" stroke="url(#paint11_linear_27_367)" strokeWidth="4" strokeLinecap="round" />
                <path id="bouche" d="M350.056 222.823C354.296 225.263 366.102 228.93 374.517 221.057M361.797 232.16C363.673 232.581 368.891 230.899 369.625 229.132" stroke="url(#paint12_linear_27_367)" strokeWidth="4" strokeLinecap="round" />
                <g id="Vector 14">
                    <path d="M378.92 269.508V256.386C365.613 267.287 348.262 262.442 341.25 258.657C337.989 256.975 331.368 253.812 330.977 254.619C330.585 255.427 343.37 264.882 349.811 269.508C360.183 275.16 373.538 271.863 378.92 269.508Z" fill="#B65646" />
                    <path d="M287.681 206.169C287.192 206.169 287.192 201.122 287.681 200.364C287.782 199.059 287.877 198.439 288.17 198.598C288.349 198.695 288.681 198.451 288.904 200.364C289.638 206.673 288.17 206.169 287.681 206.169Z" fill="#B65646" />
                    <path d="M295.264 199.355C298.786 202.787 298.036 205.327 297.221 206.169C296.634 206.572 295.916 204.486 295.508 203.645C291.008 196.983 288.904 195.99 288.415 196.327C286.654 197.134 285.643 199.523 285.479 200.364C284.305 200.768 284.012 200.196 284.012 199.86C285.969 194.409 288.578 194.392 289.638 195.065C290.046 195.065 291.741 195.923 295.264 199.355Z" fill="#B65646" />
                    <path d="M378.92 269.508V256.386C365.613 267.287 348.262 262.442 341.25 258.657C337.989 256.975 331.368 253.812 330.977 254.619C330.585 255.427 343.37 264.882 349.811 269.508C360.183 275.16 373.538 271.863 378.92 269.508Z" stroke="#B65646" />
                    <path d="M287.681 206.169C287.192 206.169 287.192 201.122 287.681 200.364C287.782 199.059 287.877 198.439 288.17 198.598C288.349 198.695 288.681 198.451 288.904 200.364C289.638 206.673 288.17 206.169 287.681 206.169Z" stroke="#B65646" />
                    <path d="M295.264 199.355C298.786 202.787 298.036 205.327 297.221 206.169C296.634 206.572 295.916 204.486 295.508 203.645C291.008 196.983 288.904 195.99 288.415 196.327C286.654 197.134 285.643 199.523 285.479 200.364C284.305 200.768 284.012 200.196 284.012 199.86C285.969 194.409 288.578 194.392 289.638 195.065C290.046 195.065 291.741 195.923 295.264 199.355Z" stroke="#B65646" />
                </g>
                <path id="Vector 17" d="M294.041 187.999L323.149 195.57C322.171 199.86 324.128 208.036 339.783 206.421C355.438 204.806 357.557 197 356.661 193.299M356.661 193.299C353.807 191.028 346.961 187.999 341.739 187.999C339.783 187.999 337.569 188.508 335.38 189.009C329.73 190.301 324.063 192.337 323.638 195.065M356.661 193.299L365.956 191.28M365.956 191.28C367.586 188.841 372.218 183.709 377.697 182.7C383.176 181.691 389.275 182.28 391.64 182.7C394.833 183.467 396.806 185.241 397.51 187.999C398.118 190.382 398.261 193.5 391.64 197.336C386.747 198.766 375.74 201.021 370.848 198.598C365.956 196.175 365.548 192.71 365.956 191.28Z" stroke="url(#paint13_angular_27_367)" strokeWidth="4" strokeLinecap="round" />
            </g>
            <g id="costume">
                <path id="Vector 20" d="M173.204 510.248C174.77 538.511 213.646 538.847 232.889 535.483C229.562 531.445 234.275 525.725 237.047 523.37H297.221C301.216 480.387 309.5 391.493 310.674 379.784C311.848 368.075 319.643 360.942 323.394 358.839H486.303C476.714 329.163 471.545 319.389 470.403 318.968C440.806 303.322 397.51 290.957 389.193 288.939C382.54 287.324 379.898 288.266 380.143 288.939C380.877 307.36 375.082 327.05 349.322 328.053C323.394 329.062 301.868 311.398 301.868 299.285L291.595 300.042C245.413 314.375 223.757 329.062 218.701 334.614C210.483 331.989 184.945 450.61 173.204 510.248Z" fill="#40B3A2" />
                <path id="Vector 21" d="M291.35 301.304C290.942 313.585 302.211 338.5 350.545 339.913C368.239 338.483 400.69 326.286 388.949 288.939M269.335 413.094H307.984M267.379 428.487H306.027M264.932 444.637H304.07" stroke="#FFF8FF" strokeWidth="5" strokeLinecap="round" />
                <g id="Vector 22">
                    <path d="M281.321 467.097H261.263C261.263 460.788 267.623 412.842 271.048 392.906L270.314 428.992C268.357 445.95 276.837 461.461 281.321 467.097Z" fill="#136055" />
                    <path d="M227.018 462.302C233.296 461.629 247.076 460.687 251.968 462.302M235.824 479.714C238.107 475.424 246.391 466.895 261.263 467.097M261.263 467.097H281.321C276.837 461.461 268.357 445.95 270.314 428.992L271.048 392.906C267.623 412.842 261.263 460.788 261.263 467.097ZM249.767 339.661C257.35 342.689 272.613 352.833 273.005 369.185M446.187 355.811C447.492 347.315 452.841 330.172 463.799 329.567" stroke="#136055" strokeWidth="5" strokeLinecap="round" />
                </g>
            </g>
            <g id="pc">
                <path id="pc_2" d="M237.047 523.37C230.198 527.812 230.85 534.894 232.4 536.492C332.607 536.492 536.056 536.24 543.297 536.24C550.537 536.24 553.652 528.081 554.304 524.632C559.686 482.069 570.742 393.461 571.916 379.532C573.09 365.602 563.925 359.007 558.952 358.335C484.591 358.166 333.619 357.931 324.617 358.335C315.615 358.738 311.327 372.718 310.674 379.532L296.732 523.37H237.047Z" fill="#6E6E7A" />
                <g id="logo_nextjs" className='opacity-0'>
                    <circle id="Ellipse" cx="441" cy="452" r="20" fill="#242424" />
                    <g id="N">
                        <path d="M432.911 443.911H435.756V460.089H432.911V443.911Z" fill="white" />
                        <path d="M435.756 447.569V443.911H436.289L453.889 466.749L451.933 468.444L435.756 447.569Z" fill="url(#paint14_linear_27_367)" />
                        <path d="M446.422 443.911H449.267V455.644H446.422V443.911Z" fill="url(#paint15_linear_27_367)" />
                    </g>
                </g>
            </g>
            <g id="dots">
                <ellipse id="Ellipse 18" cx="413.165" cy="33.5624" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 19" cx="421.482" cy="42.6469" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 20" cx="403.87" cy="42.6469" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 21" cx="395.064" cy="51.7314" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 22" cx="413.165" cy="51.7314" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 23" cx="431.266" cy="51.7314" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 24" cx="439.583" cy="60.3113" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 25" cx="421.482" cy="60.3113" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 26" cx="403.87" cy="60.3113" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 27" cx="386.258" cy="60.3113" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 28" cx="395.064" cy="69.3958" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 29" cx="413.165" cy="69.3958" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 30" cx="431.266" cy="69.3958" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 31" cx="421.482" cy="78.985" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 32" cx="403.87" cy="78.985" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
                <ellipse id="Ellipse 33" cx="413.165" cy="87.5648" rx="2.69069" ry="2.77583" fill="#DBD8EB" />
            </g>
        </g>
        <defs>
            <linearGradient id="paint0_linear_27_367" x1="148.743" y1="495.107" x2="130.642" y2="495.107" gradientUnits="userSpaceOnUse">
                <stop stopColor="#40B3A2" />
                <stop offset="1" stopColor="#2C9686" />
            </linearGradient>
            <radialGradient id="paint1_radial_27_367" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(700.335 367.671) rotate(90) scale(35.0764 34.0006)">
                <stop stopColor="#F9F7FC" />
                <stop offset="1" stopColor="#DCDDF2" />
            </radialGradient>
            <radialGradient id="paint2_radial_27_367" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(549.646 46.6141) rotate(90) scale(29.7045 28.7934)">
                <stop stopColor="#F9F7FC" />
                <stop offset="1" stopColor="#DCDDF2" />
            </radialGradient>
            <radialGradient id="paint3_radial_27_367" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38.7983 427.066) rotate(90) scale(29.1616 28.2672)">
                <stop stopColor="#F9F7FC" />
                <stop offset="1" stopColor="#DCDDF2" />
            </radialGradient>
            <linearGradient id="paint4_linear_27_367" x1="134.801" y1="127.688" x2="134.801" y2="116.332" gradientUnits="userSpaceOnUse">
                <stop stopColor="#61606B" />
                <stop offset="1" stopColor="#BDBCD1" />
            </linearGradient>
            <linearGradient id="paint5_linear_27_367" x1="129.664" y1="138.782" x2="129.664" y2="137.782" gradientUnits="userSpaceOnUse">
                <stop stopColor="#61606B" />
                <stop offset="1" stopColor="#BDBCD1" />
            </linearGradient>
            <linearGradient id="paint6_linear_27_367" x1="113.764" y1="106.482" x2="113.764" y2="105.482" gradientUnits="userSpaceOnUse">
                <stop stopColor="#61606B" />
                <stop offset="1" stopColor="#BDBCD1" />
            </linearGradient>
            <linearGradient id="paint7_linear_27_367" x1="139.571" y1="127.688" x2="139.571" y2="116.332" gradientUnits="userSpaceOnUse">
                <stop stopColor="#61606B" />
                <stop offset="1" stopColor="#BDBCD1" />
            </linearGradient>
            <linearGradient id="paint8_linear_27_367" x1="166.111" y1="15.8886" x2="166.111" y2="14.8886" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E9E9E9" />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" stopColor="#E9E9E9" />
            </linearGradient>
            <linearGradient id="paint9_linear_27_367" x1="166.111" y1="80.2372" x2="166.111" y2="79.2372" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E9E9E9" />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" stopColor="#E9E9E9" />
            </linearGradient>
            <linearGradient id="paint10_linear_27_367" x1="211.852" y1="64.5987" x2="211.852" y2="27.0874" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E9E9E9" />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" stopColor="#E9E9E9" />
            </linearGradient>
            <linearGradient id="paint11_linear_27_367" x1="358.128" y1="196.606" x2="367.725" y2="196.606" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF9F77" />
                <stop offset="1" stopColor="#B65646" />
            </linearGradient>
            <linearGradient id="paint12_linear_27_367" x1="351.279" y1="226.641" x2="374.517" y2="226.641" gradientUnits="userSpaceOnUse">
                <stop stopColor="#B65646" />
                <stop offset="1" stopColor="#50261F" />
            </linearGradient>
            <radialGradient id="paint13_angular_27_367" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(358.862 194.308) rotate(4.53731) scale(44.6587 2.05332)">
                <stop stopColor="#FFCCB6" />
                <stop offset="1" stopColor="#FFCBB0" />
            </radialGradient>
            <linearGradient id="paint14_linear_27_367" x1="432.911" y1="445.511" x2="449.286" y2="470.05" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="#242424" />
            </linearGradient>
            <linearGradient id="paint15_linear_27_367" x1="447.844" y1="443.911" x2="447.844" y2="455.644" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="#242424" />
            </linearGradient>
        </defs>
    </svg>

}

export default AcceuilIllustration
