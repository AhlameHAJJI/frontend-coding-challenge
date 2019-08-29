import React,{Component} from 'react';
import { Spin } from 'antd';
import RepositoryItem from 'components/RepositoryItem'
import axios from 'axios';
const API_URL = 'https://api.github.com';
const per_page = 100;
class RepositoryList extends Component {
    state = {
        repositories: [],
        prev: null,
        next:"",
        last:"",
        total: null,
        current_page: 1
      }
       makeHttpRequestWithPage =  (pageNumber,per_page) => {
          const url = `${API_URL}/search/repositories?q=created:>2019-07-28&sort=stars&order=desc&page=${pageNumber}&per_page=${per_page}`;
       
         axios.get(url).then((response) => {
           this.setState({ repositories: response.data.items})
          console.log(this.state.repositories); 
          var linkHeader = response.headers.link;
          var parse = require('parse-link-header');        
          var parsed = parse(linkHeader);

          
          this.state.current_page!==1 && this.setState({ prev: parsed.prev.page})
          this.setState({ next: parsed.next.page})
          this.setState({ last: parsed.last.page})
          this.setState({ current_page: pageNumber})

          console.log("prev",this.state.prev);
          console.log("next",this.state.next);
          console.log("last",this.state.last);
          console.log("currentpage",this.state.current_page);
        })
    }
        componentDidMount() {

             this.makeHttpRequestWithPage(this.state.current_page,per_page);
          }
    render(){
        const per_page= 100;
        const first= 1;
        
      
        return (
            <div className="repo-list">
               {this.state.repositories.length===0 &&  <div> the most starred Github repos that were created in the last 30 days </div> && <Spin size="large" className="spin" /> }
                {this.state.repositories.map(repo =>
                <RepositoryItem 
                key={repo.id} 
                name={repo.name} 
                avatar={repo.owner.avatar_url} 
                description={repo.description} 
                stars={repo.stargazers_count} 
                issues={repo.open_issues_count}
                ownerLogin={repo.owner.login}
                ownerUrl={repo.owner.html_url}
                 />)}   
            </div>
           
        )
    }
    
}
export default RepositoryList;