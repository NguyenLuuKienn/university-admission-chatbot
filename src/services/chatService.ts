const responseByTopic: Array<[string[], string]> = [
  [['ngành', 'khối'], 'Để tư vấn ngành chính xác, bạn hãy cho mình biết tổ hợp xét tuyển, môn học yêu thích và nhóm nghề nghiệp bạn quan tâm nhé.'],
  [['điểm', 'trúng tuyển'], 'Bạn hãy nhập điểm từng môn, khu vực ưu tiên và phương thức muốn xét tuyển. Mình sẽ giúp bạn đánh giá các lựa chọn phù hợp.'],
  [['học phí', 'chỉ tiêu'], 'Thông tin học phí và chỉ tiêu sẽ được đối chiếu theo từng ngành, chương trình và năm tuyển sinh. Bạn đang quan tâm ngành nào?'],
  [['phương thức', 'học bạ', 'đgnl'], 'Mình có thể so sánh xét điểm thi THPT, học bạ, ĐGNL và các phương thức riêng. Bạn muốn tìm hiểu phương thức nào trước?'],
  [['hồ sơ', 'đăng ký', 'thời gian'], 'Mình sẽ hướng dẫn theo từng bước gồm điều kiện, giấy tờ, thời gian và cách nộp hồ sơ. Bạn dự định xét tuyển theo phương thức nào?'],
]

export async function getAdmissionReply(message: string): Promise<string> {
  await new Promise((resolve) => window.setTimeout(resolve, 700))
  const normalizedMessage = message.toLocaleLowerCase('vi')
  const matchedResponse = responseByTopic.find(([keywords]) =>
    keywords.some((keyword) => normalizedMessage.includes(keyword)),
  )

  return matchedResponse?.[1] ?? 'Mình đã ghi nhận câu hỏi của bạn. Bạn có thể cung cấp thêm ngành học, điểm số hoặc phương thức xét tuyển đang quan tâm để mình hỗ trợ cụ thể hơn nhé.'
}
