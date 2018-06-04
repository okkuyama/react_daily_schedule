// @flow
// グローバル変数の定義
declare var g_shopId: string

import React, {Component} from 'react'
import { profile } from '../../common/config/profile'
import type { TypeThumbImg } from '../../common/type/compontent'

/*
  共通パーツ
  サムネイル表示
*/
const ThumbImg = ({filenames, size, alt, type}:TypeThumbImg) => {
    // Propsパラメータチェック
    if(!filenames || !g_shopId){
        // Noimage表示
        return(<img src="/assets/img/dummy_88_88.svg" width="88px" alt="" />)
    } else {
        // サムネイル表示
        let path = `${profile.S3ImgPath}${g_shopId}/${filenames[0]}/${size}.jpg`
        return(
            <img src={path} width="110px" alt={alt} />
        )
    }
}
ThumbImg.defaultProps = {
    filename: '',
    size: 'small',
    alt: '',
    type: 1,
}
export {ThumbImg}