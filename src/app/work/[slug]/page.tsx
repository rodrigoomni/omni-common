import { caseStudies } from "@/data/case-studies";
import CaseStudyView from "./case-study-view";

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyView slug={slug} />;
}
