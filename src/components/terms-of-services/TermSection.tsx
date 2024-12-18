interface TermsSectionProps {
  id: string;
  title: string;
  content: string;
}

export default function TermsSection({
  id,
  title,
  content,
}: TermsSectionProps) {
  return (
    <section id={id} className="mb-12 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}
