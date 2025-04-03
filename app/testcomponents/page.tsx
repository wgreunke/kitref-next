
import TestClientComponent from "../components/TestClientComponent";


export default function testComponents() {


    return (
        <div>

        {/*This runs on the server*/}
        <div>Hello</div>
        

           { /*This runs on the client*/}
            <TestClientComponent />
        </div>
    )
}
