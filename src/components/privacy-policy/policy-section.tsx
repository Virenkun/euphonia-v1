interface PolicySectionProps {
  id: string;
  title: string;
  content: string;
}

export default function PolicySection({
  id,
  title,
  content,
}: PolicySectionProps) {
  return (
    <section id={id} className="mb-8 scroll-mt-16">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="text-gray-600 space-y-4">
        {content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
