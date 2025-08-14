# images.d.ts

    - declare module '*.png';
    - declare module '*.jpg';
    - declare module '*.jpeg';
    - declare module '*.bmp';
    - declare module '*.gif';

```ts
<Image
	style={{
		// No Dimensions = No Image
		width: "100%",
		height: "100%",
		resizeMode: "cover", // cover, contain, stretch, repeat
	}}
	source={{
		uri: "https://example.com/image.png",
	}}
/>
```
