import Navigation from './components/Navigation.jsx';
import "./SignIn.css"

const SignInPage = () => {
    return (
        <div className="sign-in-page">
            <div className="sign-in">
                <div className="house">
                    <i class="bi bi-house-door"></i>
                </div>
                <p className="title">Good Neighbor</p>
                <Navigation />
            </div>
        </div>
    );
}
export default SignInPage;