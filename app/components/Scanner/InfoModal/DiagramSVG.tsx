import { DiagramColor } from ".";

export default function DiagramSVG({
  mult = 1,
  setActiveSection,
}: {
  mult?: number;
  setActiveSection: (color: DiagramColor, label: number) => (e: React.MouseEvent) => void;
}) {
  return (
    <svg
      width={146.491 * mult}
      height={252.9 * mult}
      viewBox='0 0 38.759056 66.913124'
      id='svg1'
      xmlSpace='preserve'
      xmlns='http://www.w3.org/2000/svg'
      className='transition-all duration-500 ease-in-out'
    >
      <g id='layer2'>
        <g id='section1' onClick={setActiveSection("aqua", 1)}>
          <rect
            style={{
              opacity: 0.7,
              fill: "#00ffff",
              stroke: "#ffffff",
              strokeWidth: 0.228279,
              strokeDasharray: "0.456558, 0.228279",
              strokeDashoffset: 0,
              strokeOpacity: 1,
            }}
            id='rect1'
            width={17.672222}
            height={5.7217183}
            x={1.5874274}
            y={9.3404541}
          />
          <text
            xmlSpace='preserve'
            style={{
              fontStyle: "normal",
              fontVariant: "normal",
              fontWeight: "normal",
              fontStretch: "normal",
              fontSize: "4.73255px",
              fontFamily: "Arial",
              writingMode: "horizontal-tb",
              direction: "ltr",
              opacity: 0.7,
              fill: "#ffffff",
              fillOpacity: 1,
              stroke: "none",
              strokeWidth: 0.478472,
              strokeDasharray: "0.956946, 0.478472",
              strokeDashoffset: 0,
            }}
            x={2.1384006}
            y={13.889812}
            id='text5'
          >
            <tspan
              id='tspan5'
              style={{
                fill: "#ffffff",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.478472,
              }}
              x={2.1384006}
              y={13.889812}
            >
              {"\u2460"}
            </tspan>
          </text>
        </g>
        <g id='section2' onClick={setActiveSection("yellow", 2)}>
          <rect
            style={{
              opacity: 0.7,
              fill: "#ffff00",
              stroke: "#ffffff",
              strokeWidth: 0.228196,
              strokeDasharray: "0.456391, 0.228196",
              strokeDashoffset: 0,
              strokeOpacity: 1,
            }}
            id='rect1-8'
            width={17.672306}
            height={5.7175331}
            x={19.454124}
            y={9.3422508}
          />
          <text
            xmlSpace='preserve'
            style={{
              fontStyle: "normal",
              fontVariant: "normal",
              fontWeight: "normal",
              fontStretch: "normal",
              fontSize: "4.73255px",
              fontFamily: "Arial",
              writingMode: "horizontal-tb",
              direction: "ltr",
              opacity: 0.7,
              fill: "#ffffff",
              fillOpacity: 1,
              stroke: "none",
              strokeWidth: 0.478472,
              strokeDasharray: "0.956946, 0.478472",
              strokeDashoffset: 0,
            }}
            x={20.132109}
            y={13.908945}
            id='text6'
          >
            <tspan
              id='tspan6'
              style={{
                fill: "#ffffff",
                strokeWidth: 0.478472,
              }}
              x={20.132109}
              y={13.908945}
            >
              {"\u2461"}
            </tspan>
          </text>
        </g>
        <g id='section3' onClick={setActiveSection("lime", 3)}>
          <rect
            style={{
              opacity: 0.7,
              fill: "#00ff00",
              stroke: "#ffffff",
              strokeWidth: 0.294,
              strokeDasharray: "0.58799701, 0.294",
              strokeDashoffset: 0,
              strokeOpacity: 1,
            }}
            id='rect2'
            width={35.489883}
            height={19.244431}
            x={1.6365747}
            y={15.337931}
          />
          <text
            xmlSpace='preserve'
            style={{
              fontStyle: "normal",
              fontVariant: "normal",
              fontWeight: "normal",
              fontStretch: "normal",
              fontSize: "4.73255px",
              fontFamily: "Arial",
              writingMode: "horizontal-tb",
              direction: "ltr",
              opacity: 0.7,
              fill: "#ffffff",
              fillOpacity: 1,
              stroke: "none",
              strokeWidth: 0.478472,
              strokeDasharray: "0.956946, 0.478472",
              strokeDashoffset: 0,
            }}
            x={31.616903}
            y={19.878326}
            id='text7'
          >
            <tspan
              id='tspan7'
              style={{
                fill: "#ffffff",
                strokeWidth: 0.478472,
              }}
              x={31.616903}
              y={19.878326}
            >
              {"\u2462"}
            </tspan>
          </text>
        </g>
        <g id='section4' onClick={setActiveSection("orange", 4)}>
          <rect
            style={{
              opacity: 0.7,
              fill: "#ff6600",
              stroke: "#ffffff",
              strokeWidth: 0.321613,
              strokeDasharray: "0.643228, 0.321613",
              strokeDashoffset: 0,
              strokeOpacity: 1,
            }}
            id='rect4'
            width={9.5226736}
            height={21.518484}
            x={27.588964}
            y={34.890167}
          />
          <text
            xmlSpace='preserve'
            style={{
              fontStyle: "normal",
              fontVariant: "normal",
              fontWeight: "normal",
              fontStretch: "normal",
              fontSize: "4.73255px",
              fontFamily: "Arial",
              fontVariantLigatures: "normal",
              fontVariantCaps: "normal",
              fontVariantNumeric: "normal",
              fontVariantEastAsian: "normal",
              writingMode: "horizontal-tb",
              direction: "ltr",
              opacity: 0.7,
              fill: "#ffffff",
              fillOpacity: 1,
              stroke: "none",
              strokeWidth: 0.478472,
              strokeDasharray: "0.956946, 0.478472",
              strokeDashoffset: 0,
              strokeOpacity: 1,
            }}
            x={31.621819}
            y={55.200768}
            id='text8'
          >
            <tspan
              id='tspan8'
              style={{
                fontSize: "4.72951px",
                fill: "#ffffff",
                stroke: "none",
                strokeWidth: 0.437946,
              }}
              x={31.621819}
              y={55.200768}
            >
              {"\u2463"}
            </tspan>
          </text>
        </g>
        <g id='section5' onClick={setActiveSection("fuchsia", 5)}>
          <rect
            style={{
              opacity: 0.7,
              fill: "#ff00ff",
              stroke: "#ffffff",
              strokeWidth: 0.306979,
              strokeDasharray: "0.613958, 0.306979",
              strokeDashoffset: 0,
              strokeOpacity: 1,
            }}
            id='rect3'
            width={25.63451}
            height={21.531979}
            x={1.6409222}
            y={34.883057}
          />
          <text
            xmlSpace='preserve'
            style={{
              fontStyle: "normal",
              fontVariant: "normal",
              fontWeight: "normal",
              fontStretch: "normal",
              fontSize: "4.72951px",
              fontFamily: "Arial",
              fontVariantLigatures: "normal",
              fontVariantCaps: "normal",
              fontVariantNumeric: "normal",
              fontVariantEastAsian: "normal",
              writingMode: "horizontal-tb",
              direction: "ltr",
              opacity: 0.7,
              fill: "#ffffff",
              fillOpacity: 1,
              stroke: "none",
              strokeWidth: 0.437946,
              strokeDasharray: "none",
              strokeDashoffset: 0.555591,
              strokeOpacity: 1,
            }}
            x={2.3591602}
            y={55.197311}
            id='text16'
          >
            <tspan
              id='tspan16'
              style={{
                fontSize: "4.72951px",
                fill: "#ffffff",
                stroke: "none",
                strokeWidth: 0.437946,
              }}
              x={2.3591602}
              y={55.197311}
            >
              {"\u2464"}
            </tspan>
          </text>
        </g>
      </g>
      <g id='layer1' transform='translate(-85.395472,-114.97469)'>
        <g
          style={{
            opacity: 0.7,
            fill: "#ffffff",
            fillRule: "nonzero",
            stroke: "none",
            strokeWidth: 0,
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            strokeDasharray: "none",
          }}
          transform='matrix(0.74347917,0,0,0.74347917,71.318437,114.97469)'
          id='g2'
        >
          <path
            d='M 64.967,0 H 25.033 C 21.67,0 18.934,2.736 18.934,6.098 v 77.803 c 0,3.362 2.736,6.099 6.099,6.099 h 39.934 c 3.363,0 6.099,-2.736 6.099,-6.099 V 6.098 C 71.065,2.736 68.33,0 64.967,0 Z M 20.935,12.417 h 48.131 v 63.67 H 20.935 Z M 25.033,2 h 39.934 c 2.26,0 4.099,1.838 4.099,4.098 v 4.319 H 20.935 V 6.098 C 20.935,3.838 22.773,2 25.033,2 Z M 64.967,88 H 25.033 c -2.26,0 -4.099,-1.839 -4.099,-4.099 v -5.814 h 48.131 v 5.814 c 0,2.26 -1.838,4.099 -4.098,4.099 z'
            style={{
              opacity: 1,
              fill: "#ffffff",
              fillRule: "nonzero",
              stroke: "none",
              strokeWidth: 1,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              strokeDasharray: "none",
            }}
            strokeLinecap='round'
            id='path1'
          />
          <circle
            cx={45}
            cy={83.040001}
            r={2}
            style={{
              opacity: 1,
              fill: "#ffffff",
              fillRule: "nonzero",
              stroke: "none",
              strokeWidth: 1,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              strokeDasharray: "none",
            }}
            id='circle1'
          />
          <path
            d='M 47.169,7.254 H 36.114 c -0.552,0 -1,-0.448 -1,-1 0,-0.552 0.448,-1 1,-1 h 11.055 c 0.553,0 1,0.448 1,1 0,0.552 -0.447,1 -1,1 z'
            style={{
              opacity: 1,
              fill: "#ffffff",
              fillRule: "nonzero",
              stroke: "none",
              strokeWidth: 1,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              strokeDasharray: "none",
            }}
            strokeLinecap='round'
            id='path2'
          />
          <circle
            cx={51.889999}
            cy={6.25}
            r={1.5}
            style={{
              opacity: 1,
              fill: "#ffffff",
              fillRule: "nonzero",
              stroke: "none",
              strokeWidth: 1,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              strokeDasharray: "none",
            }}
            id='circle2'
          />
        </g>
      </g>
    </svg>
  );
}
