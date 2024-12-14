import disgustSticker from "assets/Content/reports/sticker/disgust.svg"
import angerSticker from "assets/Content/reports/sticker/anger.svg"
import acceptanceSticker from "assets/Content/reports/sticker/acceptance.svg"
import surpriseSticker from "assets/Content/reports/sticker/surprise.svg"
import neutralitySticker from "assets/Content/reports/sticker/neutrality.svg"
import fearSticker from "assets/Content/reports/sticker/fear.svg"
import desireSticker from "assets/Content/reports/sticker/desire.svg"
import joySticker from "assets/Content/reports/sticker/joy.svg"
import sadnessSticker from "assets/Content/reports/sticker/sadness.svg"
import emptySticker from "assets/Content/reports/sticker/empty.svg"

import disgustStickerBg from "assets/Content/reports/sticker-bg/disgust.svg"
import angerStickerBg from "assets/Content/reports/sticker-bg/anger.svg"
import acceptanceStickerBg from "assets/Content/reports/sticker-bg/acceptance.svg"
import surpriseStickerBg from "assets/Content/reports/sticker-bg/surprise.svg"
import neutralityStickerBg from "assets/Content/reports/sticker-bg/neutrality.svg"
import fearStickerBg from "assets/Content/reports/sticker-bg/fear.svg"
import desireStickerBg from "assets/Content/reports/sticker-bg/desire.svg"
import joyStickerBg from "assets/Content/reports/sticker-bg/joy.svg"
import sadnessStickerBg from "assets/Content/reports/sticker-bg/sadness.svg"
import emptyStickerBg from "assets/Content/reports/sticker-bg/empty.svg"

export const EMOTION = {
  ["혐오"] : { key: "disgust", sticker: disgustSticker, stickerBg: disgustStickerBg },
  ["분노"] : { key: "anger", sticker: angerSticker, stickerBg: angerStickerBg },
  ["수용"] : { key: "acceptance", sticker: acceptanceSticker, stickerBg: acceptanceStickerBg },
  ["놀라움"] : { key: "surprise", sticker: surpriseSticker, stickerBg: surpriseStickerBg },
  ["중립"] : { key: "neutrality", sticker: neutralitySticker, stickerBg: neutralityStickerBg },
  ["두려움"] : { key: "fear", sticker: fearSticker, stickerBg: fearStickerBg },
  ["열망"] : { key: "desire", sticker: desireSticker, stickerBg: desireStickerBg },
  ["기쁨"] : { key: "joy", sticker: joySticker, stickerBg: joyStickerBg },
  ["슬픔"] : { key: "sadness", sticker: sadnessSticker, stickerBg: sadnessStickerBg },
  ["공허"] : { key: "empty", sticker: emptySticker, stickerBg: emptyStickerBg },
};