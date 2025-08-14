import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SCREEN_WIDTH } from '../../utils/appUtils/dimensions';

interface PropertyLoadingCardProps {
	width?: number | string;
	height?: number;
	imageHeight?: number;
	borderRadius?: number;
	baseColor?: string;
	highlightColor?: string;
	shimmer?: boolean;
	textLines?: number;
	textWidths?: number[]; // Custom widths for each text line
	marginRight?: number;
}

const PropertyLoadingCard: React.FC<PropertyLoadingCardProps> = ({
	width = SCREEN_WIDTH * 0.85,
	height = 320,
	imageHeight = 150,
	borderRadius = 12,
	baseColor = '#e0e0e0',
	highlightColor = '#f5f5f5',
	shimmer = true,
	textLines = 3,
	textWidths = [0.8, 0.7, 0.6],
	marginRight = 16,
}) => {
	return (
		<View
			style={[
				styles.card,
				{ width, height, borderRadius, marginRight },
			]}
		>
			<SkeletonPlaceholder
				enabled={shimmer}
				backgroundColor={baseColor}
				highlightColor={highlightColor}
			>
				<View>
					{/* Image Placeholder */}
					<View style={{ width: '100%', height: imageHeight, borderRadius: 8 }} />

					{/* Text Placeholders */}
					{Array.from({ length: textLines }).map((_, index) => (
						<View
							key={index}
							style={{
								width: `${(textWidths[index] || 0.8) * 100}%`,
								height: 16,
								borderRadius: 4,
								marginTop: 4,
							}}
							// style={[styles.content,{ width: `${(textWidths[index] || 0.8) * 100}%` }]}
						/>
					))}
				</View>
			</SkeletonPlaceholder>
		</View>
	);
};

export default PropertyLoadingCard;

const styles = StyleSheet.create({
	card: {
		padding: 12,
		justifyContent: 'flex-start',
		overflow: 'hidden',
	},
	content: {
		height: 20,
		borderRadius: 4,
		marginTop: 10,
	},
});
