
export class UserService {


    getAUser(id) {
        return fetch(`http://www.localhost:3001/user/userDetail/${id}`).then(res => res.json()).then(d => d.data);
    }
    

}
