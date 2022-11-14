
export class UserService {


    getAUser(id) {
        return fetch(`https://backend.missing-pet-server.herokuapp.com/user/userDetail/${id}`).then(res => res.json()).then(d => d.data);
    }
    

}
