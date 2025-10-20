import type { CreateReferral, Referral } from "@repo/validation";

import { BaseService } from "@/lib/core";

import { ReferralModel } from "./referral.model";

export class ReferralService extends BaseService {
  public async createReferral(createReferralDto: CreateReferral): Promise<Referral> {
    const referral = new ReferralModel(createReferralDto);
    return referral.save();
  }

  public findAll = () => {
    return ReferralModel.find().exec();
  };
}
