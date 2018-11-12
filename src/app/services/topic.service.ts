import { Injectable } from '@angular/core'
import { Observable, of, Subject, ObservableLike} from 'rxjs'
import { catchError, map, last } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'
import { normalize } from 'normalizr'

import { HttpService } from './http.service'
import { topicsSchema, topicSchema, commentsSchema } from 'src/app/normalizr/schema'
import { getFullTopic, getCommentsByTopicID } from '../reducers/entities.reducer'
import { getAll, getAwesome } from 'src/app/reducers/home.reducer'
import { getMy } from 'src/app/reducers/my.reducer'
import { getQuestion, getAnswer } from 'src/app/reducers/solved.reducer'
import { getShared } from 'src/app/reducers/shared.reducer'

import * as TopicAction from 'src/app/action/topic.action'
import * as HomeAction from 'src/app/action/home.action'
import * as MyAction from 'src/app/action/my.action'
import * as SolvedAction from 'src/app/action/solved.action'
import * as SharedAction from 'src/app/action/shared.action'
import * as SocketAction from 'src/app/action/socket.action'

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(
    private store: Store<any>,
    private http: HttpService
  ) {}

  private editor = new Subject<boolean>()
  public topic: Topic

  get editor$() {
    return this.editor.asObservable()
  }

  get all$(): Observable<Topic[]> {
    return this.store.pipe(select(getAll))
  }

  get awesome$(): Observable<Topic[]> {
    return this.store.pipe(select(getAwesome))
  }

  get my$(): Observable<Topic[]> {
    return this.store.pipe(select(getMy))
  }

  get question$(): Observable<Topic[]> {
    return this.store.pipe(select(getQuestion))
  }

  get answer$(): Observable<Topic[]> {
    return this.store.pipe(select(getAnswer))
  }

  get shared$(): Observable<Topic[]> {
    return this.store.pipe(select(getShared))
  }

  topic$(id: number): Observable<Topic> {
    return this.store.pipe(select(getFullTopic(id)))
  }

  comments$(id: number): Observable<Comment[]> {
    return this.store.pipe(select(getCommentsByTopicID(id)))
  }

  topics(Action: any, type = 'all', lastID?: number, size = 2): Observable<any> {
    const url = `topics/${type}`
    const params = {
      lastID,
      size
    }

    return this.http.get(url, params).pipe(
      map((res: Res) => {
        let result = normalize(res.data, topicsSchema)
        this.store.dispatch(new Action(result))
        return true
      }),
      catchError(_ => of(false))
    )
  }

  getAll(lastID: number, size = 20): Observable<boolean> {
    return this.topics(HomeAction.All, 'all', lastID, size)
  }

  getAwesome(lastID: number, size = 20): Observable<boolean> {
    return this.topics(HomeAction.Awesome, 'awesome', lastID, size)
  }

  getMy(lastID: number, size = 20): Observable<boolean> {
    return this.topics(MyAction.My, 'my', lastID, size)
  }

  getQuestion(lastID: number, size = 20): Observable<boolean> {
    return this.topics(SolvedAction.Question, 'question', lastID, size)
  }

  getAnswer(lastID: number, size = 20): Observable<boolean> {
    return this.topics(SolvedAction.Answer, 'answer', lastID, size)
  }

  getShared(lastID: number, size = 20): Observable<boolean> {
    return this.topics(SharedAction.Shared, 'shared', lastID, size)
  }

  post(params: TopicParams): Observable<boolean> {
    const url = 'topic/create'
    return this.http.post(url, params)
      .pipe(
        map((res: Res) => {
          const result: MySchema = normalize(res.data, topicSchema)
          this.store.dispatch(new TopicAction.Post(result))
          return true
        }),
        catchError(_ => of(false))
      )
  }

  put(id: number, tags: Tag[], params: TopicParams): Observable<boolean> {
    const url = `topic/update/${id}`
    return this.http.put(url, params).pipe(
      map((res: Res) => {
        const result: MySchema = normalize(res.data, topicSchema)
        result.oldTags = tags
        this.store.dispatch(new TopicAction.Update(result))
        return true
      }),
      catchError(_ => of(false))
    )
  }

  detail(id: number): Observable<boolean> {
    const { store, http } = this
    const url = `topic/${id}`
    return http.get(url).pipe(
      map((res: Res) => {
        const result = normalize(res.data, topicSchema)
        store.dispatch(new TopicAction.Detail(result))
        return true
      }),
      catchError(_ => of(false))
    )
  }

  dispatch(topic: Topic){
    const { store } = this
    const result: MySchema = normalize(topic, topicSchema)
    const action = topic.createdAt === topic.updatedAt ? 'create' : 'update'
    switch (action) {
      case 'update':
        store.dispatch(new SocketAction.UpdateTopic(result))
        break
      default:
        store.dispatch(new SocketAction.PostTopic(result))
    }
  }

  dispatchComment(comment: Comment) {
    this.store.dispatch(new TopicAction.PostComment(comment))
  }

  dispatchReply(reply: Reply) {
    this.store.dispatch(new TopicAction.PostReply(reply))
  }

  dispatchFavor(data: any) {
    this.store.dispatch(new SocketAction.Favor(data))
  }

  dispatchLike(data: any) {
    this.store.dispatch(new SocketAction.Like(data))
  }

  close() {
    this.editor.next(true)
  }

  comments(topicID: number): Observable<boolean> {
    const { http, store } = this
    const url = `comments/${topicID}`
    return http.get(url).pipe(
      map((res: Res) => {
        const result = normalize(res.data, commentsSchema)
        store.dispatch(new TopicAction.Comments(result))
        return true
      }),
      catchError(_ => of(false))
    )
  }

  /**
   * 提交评论
   */
  postComment(id: number, params: any): Observable<any> {
    const { http, store } = this
    const url = `comment/${id}`
    return http.post(url, params).pipe(
      map((res: Res) => {
        store.dispatch(new TopicAction.PostComment(res.data))
        return true
      }),
      catchError(_ => of(false))
    )
  }

  /**
   * 收藏, 取消收藏
   */
  favor(topicID: number, params: any): Observable<boolean> {
    const { http, store } = this
    const url = `topic/favor/${topicID}`
    return http.post(url, params).pipe(
      map((res: Res) => {
        const isFavor = res.data
        const data = { topicID, categoryID: params.categoryID, isFavor }
        store.dispatch(new TopicAction.Favor(data))
        return isFavor
      }),
      catchError(_ => of(false))
    )
  }

  /**
   * 点赞
   * @param type 点赞类型, 文章, 评论, 回复
   */
  like(topicID: number, params: any): Observable<boolean> {
    const { http, store } = this
    const url = `like/${topicID}`

    return http.post(url, params).pipe(
      map((res: Res) => {
        const isLike = res.data
        const data = { topicID, type: params.type, isLike }
        store.dispatch(new TopicAction.Like(data))
        return isLike
      }),
      catchError(_ => of(false))
    )
  }

  /**
   * 回复评论
   * @param id topicID
   */
  postReply(id: number, params: any): Observable<boolean> {
    const url = `comment/reply/${id}`
    const { http, store } = this
    return http.post(url, params).pipe(
      map((res: Res) => {
        store.dispatch(new TopicAction.PostReply(res.data))
        return true
      }),
      catchError(_ => of(false))
    )
  }
}
