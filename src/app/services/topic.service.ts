import { Injectable } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'
import { normalize } from 'normalizr'

import { HttpService } from './http.service'
import { topicsSchema, topicSchema, commentsSchema } from 'src/app/normalizr/schema'
import { getFullTopic, getCommentsByTopicID } from '../reducers/entities.reducer'
import { getAll, getAwesome, getDept } from 'src/app/reducers/home.reducer'
import { getMy } from 'src/app/reducers/my.reducer'
import { getQuestion, getAnswer } from 'src/app/reducers/solved.reducer'
import { getShared } from 'src/app/reducers/shared.reducer'
import { getTopicsByCollectionID } from 'src/app/reducers/collection.reducer'
import { getTopicsByTagID } from 'src/app/reducers/tag.reducer'

import * as TopicAction from 'src/app/action/topic.action'
import * as HomeAction from 'src/app/action/home.action'
import * as MyAction from 'src/app/action/my.action'
import * as SolvedAction from 'src/app/action/solved.action'
import * as SharedAction from 'src/app/action/shared.action'
import * as SocketAction from 'src/app/action/socket.action'
import * as CollectionAction from 'src/app/action/collection.action'
import * as TagAction from 'src/app/action/tag.action'

import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(
    private store: Store<any>,
    private http: HttpService,
    private us: UserService
  ) {}

  private editor = new Subject<boolean>()
  public topic: Topic

  get editor$() {
    return this.editor.asObservable()
  }

  get all$(): Observable<PageState> {
    return this.store.pipe(select(getAll))
  }

  get awesome$(): Observable<PageState> {
    return this.store.pipe(select(getAwesome))
  }

  get dept$(): Observable<PageState> {
    return this.store.pipe(select(getDept))
  }

  get my$(): Observable<PageState> {
    return this.store.pipe(select(getMy))
  }

  get question$(): Observable<PageState> {
    return this.store.pipe(select(getQuestion))
  }

  get answer$(): Observable<PageState> {
    return this.store.pipe(select(getAnswer))
  }

  get shared$(): Observable<PageState> {
    return this.store.pipe(select(getShared))
  }

  topic$(id: number): Observable<Topic> {
    return this.store.pipe(select(getFullTopic(id)))
  }

  comments$(id: number): Observable<Comment[]> {
    return this.store.pipe(select(getCommentsByTopicID(id)))
  }

  collection$(id: number): Observable<PageState> {
    return this.store.pipe(select(getTopicsByCollectionID(id)))
  }

  tag$(id: number): Observable<PageState> {
    return this.store.pipe(select(getTopicsByTagID(id)))
  }

  topics(Action: any, type = 'all', lastID?: number, size = 20, id?: number): Observable<any> {
    const url = `topics/${type}`
    const params = {
      lastID,
      size
    }

    return this.http.get(url, params).pipe(
      map((res: Res) => {
        let result: MySchema = normalize(res.data, topicsSchema)
        if (id) {
          result.id = id
        }
        result.done = result.result.length < size
        this.store.dispatch(new Action(result))
        return true
      }),
      catchError(_ => of(false))
    )
  }

  getTop(): Observable<boolean> {
    return this.http.get('topics/top').pipe(
      map((res: Res) => {
        let result = normalize(res.data, topicsSchema)
        this.store.dispatch(new HomeAction.Top(result))
        return true
      })
    )
  }

  getAll(lastID: number, size = 20): Observable<boolean> {
    return this.topics(HomeAction.All, 'all', lastID, size)
  }

  getAwesome(lastID: number, size = 20): Observable<boolean> {
    return this.topics(HomeAction.Awesome, 'awesome', lastID, size)
  }

  getDept(lastID: number, size = 20): Observable<boolean> {
    return this.topics(HomeAction.Dept, 'department', lastID, size)
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

  getByCollection(id: number, lastID: number, size = 20): Observable<boolean> {
    const url = `favor/${id}`
    return this.topics(CollectionAction.Topics, url, lastID, size, id)
  }

  getByTag(id: number, lastID: number, size = 20): Observable<boolean> {
    const url = `tag/${id}`
    return this.topics(TagAction.Topics, url, lastID, size, id)
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

  toggleTopicField(id: number, field: string) {
    const url = `topic/${field}/${id}`

    return this.http.put(url).pipe(
      map((res: Res) => {
        const Action = field === 'top' ? TopicAction.Top : TopicAction.Awesome
        this.store.dispatch(new Action(res.data))
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

  dispatch(topic: Topic) {
    const { store } = this
    const result: MySchema = normalize(topic, topicSchema)
    result.user = this.us.user
    const action = topic.createdAt === topic.updatedAt ? 'create' : 'update'
    switch (action) {
      case 'update':
        store.dispatch(new SocketAction.UpdateTopic(result))
        break
      default:
        store.dispatch(new SocketAction.PostTopic(result))
    }
  }

  dispatchComment(data: TopicData) {
    const { topic, comment } = data
    let result: MySchema = normalize(topic, topicSchema)
    result.comment = comment
    this.store.dispatch(new SocketAction.Comment(result))
  }

  dispatchReply(data: TopicData) {
    const { topic, reply } = data
    let result: MySchema = normalize(topic, topicSchema)
    result.reply = reply
    this.store.dispatch(new SocketAction.Reply(result))
  }

  dispatchFavor(data: any) {
    this.store.dispatch(new SocketAction.Favor(data))
  }

  dispatchLike(data: any) {
    this.store.dispatch(new SocketAction.Like(data))
  }

  dispatchTop(topic: Topic) {
    const result = normalize(topic, topicSchema)
    this.store.dispatch(new SocketAction.Top(result))
  }

  dispatchAwesome(topic: Topic) {
    const result: MySchema = normalize(topic, topicSchema)
    result.top = topic.top
    this.store.dispatch(new SocketAction.Awesome(result))
  }

  dispatchAnswer(data: TopicData) {
    const payload = { ...data.topic, topicID: data.topic.id, commentAuthorID: data.commentAuthorID }
    this.store.dispatch(new SocketAction.Answer(payload))
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
   * @param id 帖子, 评论, 回复id
   * @param type 点赞类型, 文章, 评论, 回复
   */
  like(id: number, params: any): Observable<boolean> {
    const { http, store } = this
    const url = `like/${id}`

    return http.post(url, params).pipe(
      map((res: Res) => {
        const isLike = res.data
        const data = { id, type: params.type, isLike }
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

  /**
   * 设置,取消评论为答案
   * @param cid 评论id
   * @param topicID 帖子id
   * @param authorID 评论作者id
   */
  CommentAsAnswer(cid: number, topicID: number, authorID: number): Observable<boolean> {
    const url = `comment/answer/${cid}`
    const { http, store } = this
    return http.post(url, {topicID, authorID}).pipe(
      map((res: Res) => {
        const payload = { topicID, commentAuthorID: authorID, ...res.data }
        store.dispatch(new TopicAction.CommentAsAnswer(payload))
        return true
      }),
      catchError(_ => of(false))
    )
  }
}
