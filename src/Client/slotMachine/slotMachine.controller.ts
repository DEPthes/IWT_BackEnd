import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { slotMachineService } from './slotMachine.service';

@ApiTags("술 추천 페이지")
@Controller('slotMachine')
export class slotMachineController {
  constructor(private readonly slotMachineService: slotMachineService) { }

  @ApiExcludeEndpoint()
  @Post('/getweather')
  getWeather(@Body('weather') weather: string, @Body('mood') mood: string, @Body('situation') situation: string) {
    return this.slotMachineService.getWeatherRecommendation(weather);
  }
 
  @ApiExcludeEndpoint()
  @Post('/getmood')
  getMood(@Body('weather') weather: string, @Body('mood') mood: string, @Body('situation') situation: string) {
    return this.slotMachineService.getMoodRecommendation(mood);
  }

  @ApiExcludeEndpoint()
  @Post('/getsituation')
  getsituation(@Body('weather') weather: string, @Body('mood') mood: string, @Body('situation') situation: string) {
    return this.slotMachineService.getSituationRecommendation(situation);
  }

  @Post('/total')
  @ApiBody({
    schema: {
      properties: {
        weather: { type: "string" },
        mood: { type: "string" },
        situation: { type: "string" }
      }
    }
  })
  @ApiOperation({ summary: '술롯머신', 
  description: `날씨, 기분, 상황에 따른 술 추천. \n
  날씨: clean, cloud, rain, shower rain, snow, thunderstorm \n
  기분: joy, excited, sad, gloom, drink, flutter, sentimental, anger \n
  상황: party, festival, sports, mt, exam, homework, meeting, travel, picnic, endCourse` })
  @ApiCreatedResponse({ description: '날씨, 기분, 상황에 따른 술 추천' })
  async getRecommendation(@Body('weather') weather: string, @Body('mood') mood: string, @Body('situation') situation: string) {
    return this.slotMachineService.getTotalRecommendation(weather, mood, situation);
  }
}