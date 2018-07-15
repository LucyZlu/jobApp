import React from 'react'
import { NavBar, Grid, List, TextareaItem, Button } from 'antd-mobile'
import {connect} from "react-redux"
import {update} from '../../redux/user.redux'
import {Redirect} from "react-router-dom"
@connect(
  state=>state,
  {update}
)
class BossInfo extends React.Component {
  constructor(props){
    super(props)
    this.state={
      job:'',
      company:'',
      salary:0,
      requirement:'',
      icon:undefined
    }
  }
  componentDidMount(){
   
    this.handleChange=this.handleChange.bind(this)
    this.handleEmit=this.handleEmit.bind(this)
  }

  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }

  handleEmit(){
    this.props.update(this.state)
  }

  render () {
    const data = Array.from(new Array(15)).map((_val, i) => ({
      icon: require(`../../component/img/img${i + 1}.png`),
      text:_val
    }))
    const header=this.state.icon?
      (
        <div>
          <span>
            已选择头像
        </span>
        <img src={this.state.icon} style={{width:20}} />
        </div>
        )
        :<div>请选择头像</div>
      
    return (
      <React.Fragment>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar
          mode='dark'>
          BOSS完善信息页
        </NavBar>
       
        <List renderHeader={()=>header}>
        <Grid 
        data={data} 
        square={false} 
        className='not-square-grid' 
        onClick={
          elm=>{
            this.setState(elm)
          }
        }/>
        </List>
       
        <List renderHeader={() => '职位描述'}>
          <TextareaItem
            title='招聘职位'
            placeholder='前端工程师'
            data-seed='job'
            onChange={(v)=>{this.handleChange('job',v)}}
          />
          <TextareaItem
            title='公司名称'
            placeholder='xx'
            data-seed='company'
            onChange={(v)=>{this.handleChange('company',v)}}
          />
          <TextareaItem
            title='职位薪资'
            placeholder='xx'
            data-seed='salary'
            onChange={(v)=>{this.handleChange('salary',v)}}
          />
          <TextareaItem
            title='职位要求'
            autoHeight
            data-seed='requirement'
            onChange={(v)=>{this.handleChange('requirement',v)}}
          />
          <List.Item>
            <Button type='primary' onClick={this.handleEmit }>保存</Button>
          </List.Item>
        </List>
      </React.Fragment>
    )
  }
}

export default BossInfo
