import type { StackProps } from "@chakra-ui/react";
import { Flex, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { memo } from "react";
import { isEmptyElement } from "utils/dom";

type Props = {
	header?: ReactNode;
} & StackProps;

const DetailsInfoGroup = ({ header, children, ...props }: Props) => {
	return (
		<Stack
			_empty={{
				display: "none",
			}}
			borderColor="neutral.3"
			backgroundColor="neutral.1"
			borderWidth={1}
			padding={{ base: 5, lg: 5 }}
			flexShrink={0}
			borderRadius={2}
			columnGap={8}
			gap={0}
			overflow="hidden"
			{...props}
		>
			<Flex
				w="full"
				position="relative"
				color="neutral.7"
				textStyle="125"
				display="flex"
				gap={3}
				_empty={{
					display: "none",
				}}
				justifyContent="flex-start"
				borderColor="neutral.3"
				borderBottomWidth={1}
				paddingBottom={2}
				alignItems="center"
			>
				{header}
			</Flex>

			{!isEmptyElement(children) && <Stack gap={0}>{children}</Stack>}
		</Stack>
	);
};

export default memo(DetailsInfoGroup);
