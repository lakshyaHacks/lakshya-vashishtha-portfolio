import Section, { Reveal } from './Section.jsx';
import ResumeButtons from './ResumeButtons.jsx';

export default function ResumeBand() {
  return (
    <Section id="resume" title="Take the full picture with you." intro="My resume in two formats. Both files are served by the Express backend." className="py-20 md:py-24">
      <Reveal>
        <ResumeButtons />
      </Reveal>
    </Section>
  );
}
