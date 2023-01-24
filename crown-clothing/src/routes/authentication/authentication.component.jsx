//import {signinwithgooglepopup,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form copy/sign-in-form.component";
import "./authentication.styls.scss";
const Authentication =()=>{
  
    return(
        <div className="authentication-container">
            <SignInForm/>
            <SignUpForm/>

        </div>
    )
}
export default Authentication;