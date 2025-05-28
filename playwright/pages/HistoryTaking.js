import { expect } from "playwright/test";

class HistoryTaking {
  constructor(page) {
    this.page = page;
    this.historyTakingChart = page.locator('li span', { hasText: /^문진/ }).nth(2);

    this.saveSuccessText = page.getByText("문진 저장을 성공하였습니다");
    this.tempSaveSuccessText = page.getByText("임시저장을 성공하였습니다");
    this.deleteSuccessText = page.getByText("문진이 삭제되었습니다");

    this.registButton = page.getByRole("button", { name: "+ 문진등록" });
    this.confirmButton = page.getByRole("button", { name: "확인" });
    this.saveButton = page.getByRole("button", { name: "저장", exact: true });
    this.temporarySaveButton = page.getByRole("button", { name: "임시저장" });
    this.deleteButton = page.getByRole("button", { name: "삭제" });

    this.selectHistoryTakingTitle = page.getByRole("heading", { name: "문진 선택" });
    this.selectHistoryTakingForm = page.getByRole("cell", { name: "문진 자동화" });
    this.radioButtonOfForm = page.getByRole("row", { name: "문진 자동화" }).getByRole("cell").nth(1);

    this.formTitle = page.getByRole("heading", { name: "문진 자동화" });
    this.formDiscription = page.getByText("문진 상단 안내 문구 자동화");

    this.essayQuestion = page.getByRole("heading", { name: "주관식 질문*" });
    this.selectEssayAnswer = page.getByRole("textbox", { name: "답변 입력란" })
    this.essayAnswer = '';

    this.multipleQuestionForOne = page.getByRole("heading", { name: "객관식 1건 선택*" });
    this.multipleForOneAnswer = page.getByRole("radio", { name: "항목1" });

    this.multipleQuestion = page.getByRole("heading", { name: "객관식 다건 선택*" });
    this.multipleAnswer1 = page.getByRole("checkbox", { name: "항목1" });
    this.multipleAnswer2 = page.getByRole("checkbox", { name: "항목2" });
    this.multipleAnswer3 = page.getByRole("checkbox", { name: "항목3" });

    this.agreeOfUsing = page.getByRole("heading", { name: "이용동의*" });
    this.checkAgree = page.getByRole("checkbox", { name: "개인정보의 수집 및 이용에 동의합니다" });

    this.checkStatus = page.getByRole("cell", { name: "완료" });
    this.checkStatus2 = page.getByRole("cell", { name: "미완료" });

    this.selectAllForms = page.locator(".survey-list-table-wrapper > .sc-hmdomO > thead > tr > th").first();

    this.deletePopupText = page.getByText("정말로 삭제하시겠습니까?");

  }

  // 문진 차트 진입
  async enterHistoryTakingChart() {
    await expect(this.historyTakingChart).toBeVisible();
    await this.historyTakingChart.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log("문진 차트 진입 성공");
  }

  // 문진 선택 진입
  async registHistoryTaking() {
    await expect(this.registButton).toBeVisible();
    await this.registButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log('문진 선택 진입 성공');
  }

  async selectHistoryTaking() {
    await expect(this.selectHistoryTakingTitle).toBeVisible();
    await expect(this.selectHistoryTakingForm).toBeVisible();
    await expect(this.radioButtonOfForm).toBeVisible();
    await this.radioButtonOfForm.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.confirmButton).toBeVisible();
    await this.confirmButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log('문진 선택 성공');
  }

  async enterHistoryTaking() {
    await expect(this.formTitle).toBeVisible();
    await expect(this.formDiscription).toBeVisible();
    await this.page.waitForLoadState("domcontentloaded");
    console.log('문진 등록 입력 시작');
  }

  async essayQuestionAnswer() {
    await expect(this.essayQuestion).toBeVisible();
    await expect(this.selectEssayAnswer).toBeVisible();
    await this.selectEssayAnswer.click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.selectEssayAnswer.type('주관식_답변_자동화', { delay: 50});
    this.essayAnswer = await this.selectEssayAnswer.inputValue();
    await this.page.waitForLoadState("domcontentloaded");
    console.log('주관식 질문 답변 성공');
  }

  async choiceOne() {
    await expect(this.multipleQuestionForOne).toBeVisible();
    await expect(this.multipleForOneAnswer).toBeVisible();
    await this.multipleForOneAnswer.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log('객관식 1건 선택 성공');
  }

  async choiceMultiple() {
    await expect(this.multipleQuestion).toBeVisible();
    await expect(this.multipleAnswer1).toBeVisible();
    await this.multipleAnswer1.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.multipleAnswer2).toBeVisible();
    await this.multipleAnswer2.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.multipleAnswer3).toBeVisible();
    await this.multipleAnswer3.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log('객관식 다건 선택 성공');
  }

  async checkAgreeToUse() {
    await expect(this.agreeOfUsing).toBeVisible();
    await expect(this.checkAgree).toBeVisible();
    await this.checkAgree.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log('이용동의 선택 성공');
  }

  async saveForm() {
    await expect(this.saveButton).toBeVisible();
    await this.saveButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log('저장 성공');
  }

  async checkSaveSuccess() {
    await expect(this.saveSuccessText).toBeVisible();
    console.log('저장 성공 스낵바 확인 성공');
  }

  async checkHistoryTaking() {
    await expect(this.checkStatus).toBeVisible();
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `-${mm}-${dd}`;

    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.getByRole('cell', { name: formattedDate })).toBeVisible();
    await expect(this.page.getByRole('cell', { name: '문진 자동화' })).toBeVisible();
    await this.page.waitForLoadState('domcontentloaded');
    console.log('저장 내용 확인 성공');
  }

  async TemporarySave() {
    await expect(this.temporarySaveButton).toBeVisible();
    await this.temporarySaveButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log('임시 저장 성공');
  }

  async checkTemporarySaveSuccess() {
    await expect(this.tempSaveSuccessText).toBeVisible();
    console.log('임시 저장 스낵바 확인 성공');
  }

  async checkIncompleteHistoryTaking() {
    await expect(this.checkStatus2).toBeVisible();
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `-${mm}-${dd}`;

    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.getByRole('cell', { name: formattedDate }).nth(0)).toBeVisible();
    await expect(this.page.getByRole('cell', { name: '문진 자동화' }).nth(0)).toBeVisible();
    await this.page.waitForLoadState('domcontentloaded');
    console.log('저장 내용 확인 성공');
  }

  async selectForm() {
    await expect(this.selectAllForms).toBeVisible();
    await this.selectAllForms.click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.deleteButton).toBeVisible();
    console.log('전체선택 성공');
  }

  async deleteForm() {
    await expect(this.deleteButton).toBeVisible();
    await this.deleteButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log('삭제 버튼 선택 성공');
  }

  async deletePopup() {
    await expect(this.deletePopupText).toBeVisible();
    await expect(this.confirmButton).toBeVisible();
    await this.confirmButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log('삭제 성공');
  }

  async deleteSuccess() {
    await expect(this.deleteSuccessText).toBeVisible();
    console.log('삭제 스낵바 확인 성공');
  }

}

export { HistoryTaking };