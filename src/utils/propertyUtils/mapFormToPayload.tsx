export const mapFormToPayload = (
  form: FormProperty,
  landlord_id: string
): Property => ({
  title: form.title.trim(),
  price: Number(form.price),
  deposit: Number(form.deposit),
  property_type: form.property_type,
  floor_no: Number(form.floor_no),
  total_floors: Number(form.total_floors),
  bedrooms: Number(form.bedrooms),
  bathrooms: Number(form.bathrooms),
  area: form.area ? Number(form.area) : undefined,
  carpet_area: form.carpet_area ? Number(form.carpet_area) : undefined,
  furnishing: form.furnishing,
  amenities: form.amenities,
  facing: form.facing,
  built_year: form.built_year ? Number(form.built_year) : undefined,
  description: form.description,
  video_url: form.video_url,
  landlord_id,
});
