import './Welcome.css'

import WelcomeHero from "../../components/Welcome/WelcomeHero";
import ProgressBlock from "../../components/Welcome/ProgressBlock";
import RecommendedCourses from "../../components/Welcome/RecommendedCourses";
import DevelopmentGoals from "../../components/Welcome/DevelopmentGoals";
import MotivationBlock from "../../components/Welcome/MotivationBlock";

export default function Welcome() {

  return (
    <section className='container'>
      <WelcomeHero />
      <ProgressBlock />
      <RecommendedCourses />
      <DevelopmentGoals />
      <MotivationBlock />
    </section>
  );
}



