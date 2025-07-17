import { Glob } from "bun";

const outputFile = "svg.d.ts";

function generateTypeDeclarations(svgFiles: string[]): string {
	const header = `// AUTO-GENERATED FILE. DO NOT EDIT.

type IconSVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;
`;

	const declarations = svgFiles.map((file) => {
		return `declare module "${file}" {
  const content: IconSVGComponent;
  export default content;
}`;
	});

	return `${header}\n${declarations.join("\n\n")}`;
}

const glob = new Glob("public/**/*.svg");
const svgFiles = Array.from(glob.scanSync());

const content = generateTypeDeclarations(svgFiles);
await Bun.write(outputFile, content);

console.log(`🧿 ✔ Type declarations written to ${outputFile}`);
