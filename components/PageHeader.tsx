interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  label?: string;
  backgroundImage?: string;
}

export default function PageHeader({
  title,
  subtitle,
  description,
  label,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <section
      className="relative py-24 bg-white overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* subtle overlay for readability */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-white/70" aria-hidden="true" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {label && (
          <p className="text-sm tracking-[0.2em] uppercase text-[#e01e41] font-medium">
            {label}
          </p>
        )}

        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-[#000f22] leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 text-lg text-[#000f22]/70 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="mt-6 text-lg text-[#000f22]/70 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
