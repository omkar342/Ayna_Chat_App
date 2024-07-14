import { useEffect } from 'react'
import { useUser, UserContextType } from '../../contexts/userContext'; 
import { useCheckToken } from '../../utils/authenticateUser';

function Hello() {

    const { userData, setUserAndToken } = useUser() as UserContextType;

    const checkToken = useCheckToken();

    useEffect(() => {
        if (!userData) {
            setTimeout(() => {
              checkToken(setUserAndToken);
            }, 1000);
        }
    },[]);

  return (
    <div>Hello</div>
  )
}

export default Hello