import React,{Component} from 'react';
import RepositoryItem from 'components/RepositoryItem'
class RepositoryList extends Component {
    render(){
        
        return (
            <div>
                 <RepositoryItem/>
                 <RepositoryItem/>
                 <RepositoryItem/>
            </div>
           
        )
    }
    
}
export default RepositoryList;