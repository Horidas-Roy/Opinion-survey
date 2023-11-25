import Banner from "../Banner/Banner";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import LatesSurveys from "../LatestSurveys/LatesSurveys";
import WorkSection from "../WorkSection/WorkSection";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <LatesSurveys></LatesSurveys>
            <WorkSection></WorkSection>
        </div>
    );
};

export default Home;