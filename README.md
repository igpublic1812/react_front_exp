"# react_front_exp" 
main example covered examples of use  array in diiff pages:
<Link
  to={{
    pathname: "/page",
    state: data // your data array of objects
  }}
>

this.props.history.push({
  pathname: '/page',
    state: data // your data array of objects
})


render() {
  const { state } = this.props.location
  return (
    // render logic here
  )
} 

deploy https://www.netlify.com/
git https://github.com/igpublic1812/react_front_exp/tree/main

compare two approuch use ListBuildingComponentOld extends Component  and 
ListBuildingComponent and regular component 